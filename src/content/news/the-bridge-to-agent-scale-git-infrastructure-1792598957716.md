---
title: "The bridge to agent-scale Git infrastructure"
description: "We moved a copy of 99.99999% of GitHub's repositories to Azure. Here's how per-reference quorums will bring over the rest, and how object storage lets reads scale independently. The post The bridge to..."
pubDate: "2026-10-21T16:00:00.000Z"
authors: ["e-learning"]
organisations: ["github"]
category: "web-development"
tags: ["github", "web-development"]
thumbnail: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=450&q=80"
heroImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=450&q=80"
keywords: ["github", "tech news", "developer"]
canonicalUrl: "https://github.blog/engineering/architecture-optimization/the-bridge-to-agent-scale-git-infrastructure/"
---

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p class="wp-block-paragraph">Over the past year, while Git traffic grew exponentially, 99.99999% of the Git repositories on GitHub began living in two places at once: our own data centers and Azure. The rest are among the busiest on the platform, and they&rsquo;re held back by just one thing: a 25ms round trip.</p>



<p class="wp-block-paragraph">In an <a href="https://github.blog/engineering/architecture-optimization/building-git-infrastructure-for-agent-scale-development/">earlier blog post</a>, we laid out the two principles behind our next-generation storage architecture:</p>



<ul class="wp-block-list">
<li>Minimize coordination</li>



<li>Decouple storage from compute</li>
</ul>



<p class="wp-block-paragraph">In this post, we&rsquo;ll look at the immediate bridge between our old design and our new one. We&rsquo;ll talk about how a change to the way our quorum serializes writes gets the busiest repositories into Azure, and how that same step opens the door to replicas that keep no persistent state of their own.</p>



<h2 id="h-how-we-got-here" class="wp-block-heading">How we got here</h2>



<p class="wp-block-paragraph">The timing and shape of the move were driven by the agentic shift: rapidly growing traffic, a hard ceiling on the power capacity of our data centers and the surrounding geographical region, and physical supply chain constraints. At the beginning of our migration, the remaining capacity with all possible expansion gave us enough time to migrate safely, but not enough to do it slowly.</p>



<p class="wp-block-paragraph">While we had prototyped new architectural approaches for scaling Git on cloud infrastructure, changing the storage architecture and the hosting platform at the same time, under that growth, carried too much risk. Given our scale and how critical the service is to the community, we needed to sequence the work carefully: move the data first, then evolve the architecture once it arrived.</p>



<p class="wp-block-paragraph">Git operations are a Tier 0 service: they&rsquo;re a core function of GitHub, and nearly everything in GitHub depends on the repository data. That meant the data, services, and every dependency had to move first. The first copy of a repository landed in Azure&rsquo;s Central US region in August 2025. Today, most repositories have two of their five replicas in Azure, and Azure serves about half of Git traffic. For most of that time, Azure absorbed our growth while our own data centers held steady.</p>



<p class="wp-block-paragraph">During the migration, traffic follows the data. Most repositories have five replicas to balance durability, availability, and scale. To minimize read latency, Spokes uses preferential routing to direct traffic to a replica in the same region and availability zone as the request. As replicas move to Azure, the share of the traffic that can be served from Azure grows with each one, until the last replica arrives and the old region stops receiving requests entirely. Every repository goes through this process:</p>



<figure class="wp-block-video"><video height="900" style="aspect-ratio: 1600 / 900;" width="1600" controls poster="https://github.blog/wp-content/uploads/2026/10/Screenshot-2026-10-20-at-2.23.48-PM.png" src="https://github.blog/wp-content/uploads/2026/10/replica-migration.mp4"></video></figure>



<h2 id="h-no-repository-left-behind" class="wp-block-heading">No repository left behind</h2>



<p class="wp-block-paragraph">So, what about the remaining 0.00001% of repositories?</p>



<p class="wp-block-paragraph">In our current architecture, a repository hosted in more than one region has a lower write throughput ceiling. Spokes&rsquo; quorum only needs a majority to commit a write, but it waits for every healthy replica to respond (up to a timeout) before moving on, so slow replicas delay every write rather than falling behind. In practice, that means the slowest healthy replica sets the latency of every write, and because each write holds a repository-wide lock until it commits, it also sets the throughput ceiling. Once a replica lives in the target Azure region, it&rsquo;s about 1,000 miles from our data centers, making each network round trip around 25ms, and a write requires multiple round trips. A repository already near its throughput ceiling can&rsquo;t absorb that on every serialized write; it would fall further behind with every push.</p>



<p class="wp-block-paragraph">This is where our first principle, minimizing coordination, comes into play. Specifically for this case: don&rsquo;t serialize what doesn&rsquo;t need to be. Git&rsquo;s consistency requirements apply to each reference individually. Once the server accepts an update to a reference, no client should see an older value afterward, only that value or a newer one. That holds whether the update is a fast-forward, a force push, or a delete. But in most cases, updates to different references don&rsquo;t depend on each other and can be applied independently.</p>



<p class="wp-block-paragraph">So, we&rsquo;re changing the scope of the quorum from the whole repository to individual references.</p>



<p class="wp-block-paragraph">Holding a repository-wide lock for the entire reference update, round trips included, turns the quorum into a single, unordered request queue with one write in flight at a time. Each write in that queue takes as long as the slowest healthy replica. As the write rate grows, so does the queue, and each write waits longer than the one before it.</p>



<p class="wp-block-paragraph">With per-reference serialization, only writes that contend on a shared reference must wait for each other. In practice, most writes to a repository touch different references&mdash;for example, agents and developers pushing to their own branches&mdash;so they no longer wait on each other. Each write still experiences the cross-region latency but writes to different references can be in flight at the same time. That removes the single bottleneck on the repository. We can visualize how queueing and timeouts build up by comparing the two approaches side by side under similar load:</p>



<figure class="wp-block-video"><video height="832" style="aspect-ratio: 1600 / 832;" width="1600" controls poster="https://github.blog/wp-content/uploads/2026/10/Screenshot-2026-10-20-at-2.29.27-PM.png" src="https://github.blog/wp-content/uploads/2026/10/write-concurrency.mp4"></video></figure>



<p class="wp-block-paragraph">These changes raise a repository&rsquo;s write throughput ceiling roughly in proportion to how many references are being written at once, and get the last remaining repositories into Azure. In internal testing with realistic traffic, writes to different references consistently saw 3&ndash;4x higher throughput at lower latency.</p>



<h2 id="h-scaling-reads-on-their-own" class="wp-block-heading">Scaling reads on their own</h2>



<p class="wp-block-paragraph">Most repositories are heavily read-skewed, with somewhere between 100 and 1,000 reads for every write. Today, reads and writes hit the same replicas, so they compete for the same resources and can&rsquo;t be scaled independently.</p>



<p class="wp-block-paragraph">Decoupling storage from compute changes that. Once repository data is durably stored in Azure Blob Storage and updated with each incoming write, we can begin to decouple read traffic from the write quorum, and independently scale the compute needed for each. For example, reads would benefit from far more in-memory cache than we give them today, but that memory is also needed for compaction. Once they&rsquo;re separated, each gets its own configuration.</p>



<p class="wp-block-paragraph">The first step is making object storage a member of the quorum, but a special one that we call a virtual replica. The compute that represents it is our first fully ephemeral node. It serves as a bridge to object storage, streaming incoming writes and serving no reads. Because it&rsquo;s a member of the quorum, a write isn&rsquo;t acknowledged until it&rsquo;s durable in object storage.</p>



<p class="wp-block-paragraph">That adds a little latency to each write, but just like the cross-region round trip, per-reference serialization keeps it from becoming a throughput bottleneck. The virtual write replica also coalesces transactions on disjoint references into a single set of network I/Os to object storage, so a busy repository pays for one round trip across many concurrent writes instead of one per write. For now, the virtual write replica also handles compaction, and read replicas inherit the compacted state.</p>



<p class="wp-block-paragraph">With the virtual write replica in place, we can scale out as many virtual read replicas as a repository needs, on demand. Each read replica warms its cache from Azure Blob Storage and starts taking read traffic without joining the quorum, using object storage as the source of truth and reconciling its local state against it in the background.</p>



<p class="wp-block-paragraph">This step unlocks significant read scale. In internal testing, our distributed load testing harness routinely found ceilings in the current architecture. Against virtual read replicas, the harness hit its own limits first. It also comes with a few challenges that are solved in subsequent steps:</p>



<ol class="wp-block-list">
<li>Virtual read replicas start out reconciling with object storage in the background, which makes them a good fit for some read workloads but not all of them. Serving every kind of read requires moving that reconciliation in-line, fetching only the reference state and data that changed since the replica last caught up.</li>



<li>While we&rsquo;ve incrementally increased write throughput by shifting to a per-reference model, the quorum remains the bounding factor for increasing further.</li>
</ol>



<p class="wp-block-paragraph">How can we push write throughput further?</p>



<h2 id="h-what-comes-next" class="wp-block-heading">What comes next</h2>



<p class="wp-block-paragraph">The GitHub of today was built on the Spokes quorum, and over the years Spokes has become much more than a quorum coordinator. It&rsquo;s also an intelligent routing and load balancing layer, a unified API that internal clients use to access and transact repository data at well over 100 billion operations per day, and a collection of background systems we call &ldquo;sweepers&rdquo; that handle repository placement, repair, and rebalancing between storage nodes.</p>



<p class="wp-block-paragraph">The vast majority of what lives under the Spokes service umbrella applies just as well to the new architecture as it does to the existing one. But we also recognize that the commit protocol that has taken GitHub to a billion repositories won&rsquo;t take it to the next billion and beyond.</p>



<p class="wp-block-paragraph">We&rsquo;re not done yet. With these steps in place, the next limit is write throughput. Every write still waits on replicas that each hold a full copy of the repository, yet very little of a write actually needs to be ordered. Git objects are immutable and named by their contents, so they can be stored without anyone agreeing on them. What&rsquo;s left is small, and the hard part is ordering it as fast as possible without moving the bottleneck somewhere else. Designing for that on a whiteboard is one thing. Doing it underneath a billion repositories that developers and agents are writing to around the clock is another. Getting there forced us to rethink the second-order effects too, like where durable reference state lives and how compaction and garbage collection scale.</p>



<p class="wp-block-paragraph">Agent traffic isn&rsquo;t slowing down, and each of these steps gives repositories more headroom as it lands, without waiting for the end state.</p>



<p class="wp-block-paragraph"><strong>Coming next week:</strong> At GitHub Universe and in the final post in this series, we&rsquo;ll take a tour through that end state, what it does for write throughput, the second-order problems we had to solve to get there, and why there&rsquo;s still a (small) consensus group somewhere in the stack.</p>



<p class="wp-block-paragraph"><em>Thanks to Brian Celenza for their contributions to this post.</em></p>
</body></html>
<p>The post <a href="https://github.blog/engineering/architecture-optimization/the-bridge-to-agent-scale-git-infrastructure/">The bridge to agent-scale Git infrastructure</a> appeared first on <a href="https://github.blog">The GitHub Blog</a>.</p>

---
*Artikel ini otomatis diambil dari [GitHub Blog](https://github.blog/engineering/architecture-optimization/the-bridge-to-agent-scale-git-infrastructure/). Baca artikel selengkapnya di sumber asli.*
