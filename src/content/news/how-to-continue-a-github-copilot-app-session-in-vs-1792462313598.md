---
title: "How to continue a GitHub Copilot app session in VS Code"
description: "Learn how to move an agent session from the GitHub Copilot app into VS Code without losing the conversation, code changes, or working context. The post How to continue a GitHub Copilot app session in ..."
pubDate: "2026-10-19T18:47:22.000Z"
authors: ["e-learning"]
organisations: ["github"]
category: "web-development"
tags: ["github", "web-development"]
thumbnail: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=450&q=80"
heroImage: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=800&h=450&q=80"
keywords: ["github", "tech news", "developer"]
canonicalUrl: "https://github.blog/ai-and-ml/github-copilot/how-to-continue-a-github-copilot-app-session-in-vs-code/"
---

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><body><p class="wp-block-paragraph">The agent has finished the bulk of your change. Now you want to inspect one implementation detail, adjust a few lines by hand, and run the project locally before you ship it.</p>



<p class="wp-block-paragraph">But the work is sitting in the <a href="https://github.com/features/ai/github-app">GitHub Copilot app</a>&hellip; and your editor is where you review diffs, debug code, and make final adjustments. Do you have to choose between staying in the session and starting over in Visual Studio Code?</p>



<p class="wp-block-paragraph">You don&rsquo;t. You can open the Copilot app session directly in VS Code and continue with its conversation, code changes, and working context intact. That means Copilot can handle the repetitive or time-consuming work, then hand control back to you for closer review, hands-on editing, and local testing.</p>



<p class="wp-block-paragraph">In this tutorial, you&rsquo;ll learn how to:</p>



<ul class="wp-block-list">
<li>Open a Copilot app session in VS Code.</li>



<li>Review the agent&rsquo;s changes line by line.</li>



<li>Continue the same conversation from your editor.</li>



<li>Modify and test the code locally.</li>



<li>Push your updates to the pull request associated with the session.</li>
</ul>



<aside data-color-mode="light" data-dark-theme="dark" data-light-theme="light_dimmed" class="wp-block-group post-aside--large p-4 p-md-6 is-style-light-dimmed has-global-padding is-layout-constrained wp-block-group-is-layout-constrained is-style-light-dimmed--1" style="border-top-width:4px">
<h2 id="h-prerequisites-nbsp" class="wp-block-heading">Prerequisites&nbsp;</h2>



<p class="wp-block-paragraph">Before you begin, make sure you have:&nbsp;</p>



<ul class="wp-block-list">
<li>The GitHub Copilot app installed and signed in.&nbsp;</li>



<li><a href="https://code.visualstudio.com/" target="_blank" rel="noopener">Visual Studio Code installed</a> and connected to the same GitHub account.&nbsp;</li>



<li>A Copilot app session with code changes you want to review or continue.&nbsp;</li>



<li>Permission to work in and push changes to the session&rsquo;s repository.&nbsp;</li>
</ul>



<p class="wp-block-paragraph">This tutorial assumes you are already comfortable navigating VS Code, running commands in its integrated terminal, and working with Git branches and pull requests.</p>
</aside>



<h2 id="h-1-start-with-a-session-in-the-copilot-app" class="wp-block-heading">1. Start with a session in the Copilot app</h2>



<p class="wp-block-paragraph">Open the session you want to continue. Before handing it off, take a moment to review the task and the work Copilot completed.</p>



<p class="wp-block-paragraph">A session contains more than a collection of modified files. It also records the task, the plan, and the conversation that produced those changes. That context is important when you want to understand why Copilot chose a particular implementation or ask it to revise part of the work.</p>



<p class="wp-block-paragraph">You do not need to summarize that history or copy it into a new chat before moving to VS Code.</p>



<h2 id="h-2-open-the-session-in-vs-code" class="wp-block-heading">2. Open the session in VS Code</h2>



<p class="wp-block-paragraph">From the session, select <strong>Open in VS Code</strong>. If the app presents more than one supported editor or VS Code installation, choose the one you want to use.</p>



<p class="wp-block-paragraph">VS Code opens the project using the worktree associated with the session. It also displays the existing session in the Copilot sidebar.</p>



<p class="wp-block-paragraph">That gives you three connected pieces of the original work:</p>



<ul class="wp-block-list">
<li><strong>The session context:</strong> The task, plan, and conversation remain available.</li>



<li><strong>The diff:</strong> The files and lines changed by the agent are ready for review.</li>



<li><strong>The worktree:</strong> VS Code opens the same isolated working tree the session used.</li>
</ul>



<p class="wp-block-paragraph">You are continuing the existing session, not reconstructing it in a new editor window.</p>



<h2 id="h-3-review-the-agent-s-changes" class="wp-block-heading">3. Review the agent&rsquo;s changes</h2>



<p class="wp-block-paragraph">Before editing, inspect the diff in VS Code. Open the Source Control view to see the changed files, then select a file to review its changes line by line.</p>



<p class="wp-block-paragraph">Review the implementation as you would any other proposed change. In particular, check that:</p>



<ul class="wp-block-list">
<li>The code solves the requested problem.</li>



<li>The implementation follows the repository&rsquo;s conventions.</li>



<li>Error states and edge cases are handled appropriately.</li>



<li>Tests cover the behavior that changed.</li>



<li>No unrelated files or behaviors were modified.</li>
</ul>



<p class="wp-block-paragraph">The preserved conversation can help explain how Copilot arrived at the implementation. If something is unclear, continue prompting Copilot in the sidebar. For example:</p>


<div class="wp-block-code-wrapper">
<pre class="wp-block-code language-plaintext"><code>Explain why you changed this function instead of adding a new helper. Identify any behavior this could affect.</code></pre>
<clipboard-copy aria-label="Copy" class="code-copy-btn" data-copy-feedback="Copied!" value="Explain why you changed this function instead of adding a new helper. Identify any behavior this could affect." tabindex="0" role="button"><svg aria-hidden="true" height="16" viewbox="0 0 16 16" version="1.1" width="16" class="octicon octicon-copy js-clipboard-copy-icon"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg><svg aria-hidden="true" height="16" viewbox="0 0 16 16" version="1.1" width="16" class="octicon octicon-check js-clipboard-check-icon"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg></clipboard-copy></div>


<p class="wp-block-paragraph">You can also ask Copilot to make another change. Because the session and worktree remain connected, you do not have to describe the task from the beginning.</p>



<h2 id="h-4-make-a-hands-on-edit" class="wp-block-heading">4. Make a hands-on edit</h2>



<p class="wp-block-paragraph">Once you understand the proposed changes, edit any file directly in VS Code.</p>



<p class="wp-block-paragraph">This is useful for adjustments that are faster or easier to make by hand, such as:</p>



<ul class="wp-block-list">
<li>Refining a label or error message.</li>



<li>Renaming a variable for clarity.</li>



<li>Adjusting layout or styling.</li>



<li>Adding a missing test case.</li>



<li>Applying a repository-specific convention.</li>
</ul>



<p class="wp-block-paragraph">You are editing the session&rsquo;s existing worktree, so your manual changes build directly on the agent&rsquo;s work. You do not need to copy files between directories or manually re-create the branch.</p>



<h2 id="h-5-run-and-verify-the-project-locally" class="wp-block-heading">5. Run and verify the project locally</h2>



<p class="wp-block-paragraph">Use the VS Code integrated terminal to run the project&rsquo;s normal validation workflow. The exact commands depend on the repository, but some web app examples may include:</p>



<ul class="wp-block-list">
<li><code>npm install</code></li>



<li><code>npm test</code></li>



<li><code>npm run lint</code></li>



<li><code>npm run dev</code></li>
</ul>



<p class="wp-block-paragraph">Treat agent-generated changes the same way you would treat code written by a person: run the relevant tests, inspect failures, and verify the behavior yourself.</p>



<p class="wp-block-paragraph">If the development server prints a localhost URL, open it to test the change in a browser. When supported by your VS Code setup, you can open the URL in VS Code&rsquo;s integrated browser and inspect the result without leaving the editor.</p>



<p class="wp-block-paragraph">For a user-interface change, verify both the requested behavior and nearby states. For example, check the modified component at different viewport sizes and confirm that loading, empty, and error states still work.</p>



<h2 id="h-6-continue-with-copilot-or-keep-editing-yourself" class="wp-block-heading">6. Continue with Copilot or keep editing yourself</h2>



<p class="wp-block-paragraph">At any point, you can choose the interaction that best fits the next step:</p>



<ul class="wp-block-list">
<li>Prompt Copilot when the change requires repository-wide analysis or repetitive edits.</li>



<li>Edit directly when you know the exact change you want.</li>



<li>Use both approaches iteratively as you test and refine the implementation.</li>
</ul>



<p class="wp-block-paragraph">For example, after making a manual UI adjustment, you might ask Copilot:</p>



<p class="wp-block-paragraph">Add a test for the updated label and run the relevant test file. Do not modify unrelated components.</p>



<p class="wp-block-paragraph">Because you are still in the original session, Copilot retains the context needed to interpret &ldquo;the updated label.&rdquo;</p>



<h2 id="h-7-commit-and-push-the-finished-changes" class="wp-block-heading">7. Commit and push the finished changes</h2>



<p class="wp-block-paragraph">When the implementation is ready, review the final diff one more time. Then commit and push the changes using the Source Control view or the integrated terminal:</p>



<ul class="wp-block-list">
<li><code>git status</code></li>



<li><code>git add</code></li>



<li><code>git commit -m "Refine session changes"</code></li>



<li><code>git push</code></li>
</ul>



<p class="wp-block-paragraph">Use your repository&rsquo;s normal branch, commit, review, and approval practices. Because VS Code opened the worktree and branch associated with the session, pushing the branch updates the pull request already tracking that work.</p>



<p class="wp-block-paragraph">There is no need to copy the finished files into another checkout or reconnect the work to the pull request manually.</p>



<h2 id="h-a-continuous-workflow-from-agent-to-editor" class="wp-block-heading">A continuous workflow from agent to editor</h2>



<p class="wp-block-paragraph">Opening a Copilot app session in VS Code gives you a clean division of labor without splitting the work itself. Copilot can take on a larger or repetitive implementation, while you can move into the editor for detailed review, targeted changes, local testing, and final polish.</p>



<p class="wp-block-paragraph">The session, diff, and worktree move with you. Start by directing the work in the Copilot app, switch to VS Code whenever you want hands-on control, and push the finished result through the same pull request workflow.</p>



<div class="wp-block-group post-content-cta has-global-padding is-layout-constrained wp-block-group-is-layout-constrained">
<p class="wp-block-paragraph">Ready to try it? <a href="https://gh.io/app">Download the GitHub Copilot app</a>, start a session, and open it in VS Code when you are ready to continue coding.</p>
</div>
</body></html>
<p>The post <a href="https://github.blog/ai-and-ml/github-copilot/how-to-continue-a-github-copilot-app-session-in-vs-code/">How to continue a GitHub Copilot app session in VS Code</a> appeared first on <a href="https://github.blog">The GitHub Blog</a>.</p>

---
*Artikel ini otomatis diambil dari [GitHub Blog](https://github.blog/ai-and-ml/github-copilot/how-to-continue-a-github-copilot-app-session-in-vs-code/). Baca artikel selengkapnya di sumber asli.*
