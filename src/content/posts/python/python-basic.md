---
title: "Belajar Python Basic: Panduan Lengkap untuk Pemula"
description: "Panduan dasar Python untuk pemula: instalasi, variabel, tipe data,
  percabangan, perulangan, fungsi, dan list sampai dictionary."
summary: Belajar fundamental Python dari nol dengan contoh kode yang mudah dipraktikkan.
authors:
  - royy
categories:
  - Python
tags:
  - python, pemula, basic, tutorial
keywords:
  - belajar python
  - python basic
  - python untuk pemula
  - tutorial python
thumbnail: /images/python-basic-thumbnail-2.jpg
heroImage: /images/python-basic-hero-1.jpg
customOgImage: /images/python-basic-hero-1-1.jpg
featured: false
draft: false
difficulty: beginner
links:
  website: https://www.python.org
  documentation: https://docs.python.org/3/tutorial/
  downloadUrl: https://www.python.org/downloads/
references:
  - https://docs.python.org/3/tutorial/
  - https://www.python.org/about/gettingstarted/
license: MIT
language: English
---
# Belajar Python Basic: Panduan Lengkap untuk Pemula

Python adalah bahasa pemrograman yang sintaksnya sederhana dan mudah dibaca, jadi cocok banget untuk yang baru mulai belajar coding.

## Instalasi

1. Download Python dari [python.org](https://www.python.org/downloads/).
2. Install, dan centang **Add Python to PATH** (Windows).
3. Cek versinya di terminal:

```bash
python --version
```

## Program Pertama

```python
print("Halo, Dunia!")
```

## Variabel dan Tipe Data

```python
nama = "Budi"        # string
umur = 17            # integer
tinggi = 170.5       # float
aktif = True         # boolean

print(nama, umur, tinggi, aktif)
```

## Input dan Operator

```python
nama = input("Siapa namamu? ")
print("Halo,", nama)

a = 10
b = 3
print(a + b, a - b, a * b, a / b, a // b, a % b, a ** b)
```

## Percabangan (if, elif, else)

```python
nilai = 80

if nilai >= 90:
    print("A")
elif nilai >= 75:
    print("B")
else:
    print("C")
```

## Perulangan

```python
# for
for i in range(1, 6):
    print(i)

# while
n = 0
while n < 3:
    print("n =", n)
    n += 1
```

## Fungsi

```python
def sapa(nama):
    return f"Halo, {nama}!"

print(sapa("Python"))
```

## List dan Dictionary

```python
buah = ["apel", "jeruk", "mangga"]
buah.append("pisang")
print(buah[0], len(buah))

siswa = {"nama": "Budi", "umur": 17}
print(siswa["nama"])
```

## Latihan

1. Buat program kalkulator sederhana (tambah, kurang, kali, bagi).
2. Buat program yang mencetak bilangan genap dari 1 sampai 50.
3. Buat fungsi yang menghitung rata-rata dari sebuah list angka.

## Kesimpulan

Kamu sudah belajar dasar Python: variabel, tipe data, percabangan, perulangan, fungsi, list, dan dictionary. Langkah berikutnya, coba materi OOP, file handling, dan library populer seperti `requests` atau `pandas`.