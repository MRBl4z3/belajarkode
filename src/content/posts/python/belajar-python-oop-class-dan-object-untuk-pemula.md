---
title: "Belajar Python OOP: Class dan Object untuk Pemula"
description: "Pelajari dasar Object Oriented Programming di Python: class,
  object, atribut, method, constructor, dan inheritance dengan contoh
  sederhana."
summary: Memahami konsep OOP di Python lewat contoh kode yang mudah diikuti.
authors:
  - royy
categories:
  - python
tags:
  - python, oop, class, object, inheritance
keywords:
  - python oop
  - class python
  - object python
  - inheritance python
  - belajar python menengah
thumbnail: /images/python-oop-thumbnail.jpg
heroImage: /images/python-oop-hero.jpg
customOgImage: /images/python-oop-og.jpg
featured: false
draft: false
difficulty: intermediate
links:
  website: https://www.python.org
  documentation: https://docs.python.org/3/tutorial/classes.html
references:
  - https://docs.python.org/3/tutorial/classes.html
  - https://docs.python.org/3/reference/datamodel.html
license: MIT
language: English
---
# Belajar Python OOP: Class dan Object untuk Pemula

OOP (Object Oriented Programming) adalah cara menulis program dengan memecahnya jadi **object** yang punya data dan perilaku sendiri. Di Python, hampir semuanya adalah object, jadi memahami OOP akan bikin kodemu lebih rapi dan mudah dikembangkan.

## Apa Itu Class dan Object?

- **Class** adalah cetakan atau blueprint.
- **Object** adalah hasil jadi dari cetakan itu.

Analoginya: class `Mobil` adalah rancangan mobil, sedangkan mobil merah milikmu adalah object-nya.

## Membuat Class Pertama

```python
class Mobil:
    pass

mobil_saya = Mobil()
print(type(mobil_saya))
```

## Constructor dan Atribut

Method `__init__` dipanggil otomatis saat object dibuat. Di sinilah atribut diisi.

```python
class Mobil:
    def __init__(self, merk, warna):
        self.merk = merk
        self.warna = warna

mobil1 = Mobil("Toyota", "merah")
mobil2 = Mobil("Honda", "hitam")

print(mobil1.merk, mobil1.warna)
print(mobil2.merk, mobil2.warna)
```

`self` merujuk ke object yang sedang dibuat atau dipakai.

## Method

Method adalah fungsi di dalam class.

```python
class Mobil:
    def __init__(self, merk, warna):
        self.merk = merk
        self.warna = warna
        self.kecepatan = 0

    def gas(self, tambahan):
        self.kecepatan += tambahan
        print(f"{self.merk} melaju {self.kecepatan} km/jam")

    def rem(self):
        self.kecepatan = 0
        print(f"{self.merk} berhenti")

mobil = Mobil("Toyota", "merah")
mobil.gas(40)
mobil.gas(20)
mobil.rem()
```

## Inheritance (Pewarisan)

Class bisa mewarisi atribut dan method dari class lain, jadi kamu nggak perlu menulis ulang kode yang sama.

```python
class Kendaraan:
    def __init__(self, nama):
        self.nama = nama

    def info(self):
        print(f"Ini adalah {self.nama}")

class Motor(Kendaraan):
    def klakson(self):
        print("Tin tin!")

motor = Motor("Vario")
motor.info()
motor.klakson()
```

## Method Khusus `__str__`

Biar object tampil rapi saat di-print:

```python
class Siswa:
    def __init__(self, nama, kelas):
        self.nama = nama
        self.kelas = kelas

    def __str__(self):
        return f"{self.nama} (kelas {self.kelas})"

print(Siswa("Budi", "X-A"))
```

## Latihan

1. Buat class `Buku` dengan atribut `judul` dan `penulis`, serta method `info()`.
2. Buat class `Kucing` yang mewarisi class `Hewan`, lalu tambahkan method `mengeong()`.
3. Buat class `RekeningBank` dengan method `setor()` dan `tarik()`. Pastikan saldo tidak bisa negatif.

## Kesimpulan

Kamu sudah mempelajari class, object, constructor, method, inheritance, dan `__str__`. Selanjutnya coba pelajari encapsulation, polymorphism, dan modul `dataclasses` untuk menulis class dengan lebih singkat.