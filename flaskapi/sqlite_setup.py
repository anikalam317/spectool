#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script to setup application database.
"""
import sqlite3
import numpy as np
from random import random

__author__ = "Brent Maranzano"
__license__ = "MIT"

# Create a database to store application data
con = sqlite3.connect('spectra.db')
cur = con.cursor()

cur.execute("""CREATE TABLE spectra"""
            + """(name text, lambda integer, abs integer)""")
con.commit()

# Create fake spectra
compounds = [f"compound{n}" for n in "a, b, c, d".split(", ")]
wavelength = range(1000, 2000, 10)
scale = [(s, s + 0.05, s * 0.1, s * 0.1 + 0.005)
         for s in np.arange(.08, .2, .02)]
nabs = list()
for c, s in zip(compounds, scale):
    nabs.append(
        [random() * np.sin(s[0] * x) + random() * np.sin(s[1] * x + 1)
         + random() * np.sin(s[2] * x) + random() * np.sin(s[3] * x + 0.5)
         for x in wavelength]
    )

# Insert spectra into database
sql = """ INSERT INTO spectra"""\
    + """(name,lambda,abs)"""\
    + """ VALUES(?,?,?) """
for i, c in enumerate(compounds):
    for w, a in zip(wavelength, nabs[i]):
        cur.execute(sql, (c, w, a))
con.commit()

con.close()
