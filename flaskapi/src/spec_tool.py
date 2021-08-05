import numpy as np
import sqlite3
from pdb import set_trace


class SpecTool():
    def __init__(self):
        self._db = "spectra.db"

    def get_compounds(self):
        conn = sqlite3.connect(self._db)
        cur = conn.cursor()
        cur.execute("SELECT name FROM spectra")
        names = cur.fetchall()
        names = sorted(set([n[0] for n in names]))
        return names

    def get_wavelength(self):
        compounds = self.get_compounds()
        spectra = self.get_spectra(compounds[0])[compounds[0]]
        wavelength = spectra[:, 0]
        return wavelength

    def get_spectra(self, name=None):
        """Retrieve the specta with name from the database as an Nx2 array with
        column 1 as the wavelength and column 2 as the absorpton. If no name is
        provided return all the spectra as a dictionary of arrays, where the
        key is the name, and the values are the spectra as defined above.

        Arguments:
        name (str): Name of the spectra

        Returns dictionary with name(s) as key(s) and Nx2 numpy array of
        wavelength and absorption.
        """
        conn = sqlite3.connect(self._db)
        cur = conn.cursor()
        data = {}
        if name is None:
            names = self.get_compounds()
            for name in names:
                data.update(self.get_spectra(name))
            return data
        else:
            sql = f"SELECT lambda, abs FROM spectra WHERE name LIKE '{name}'"
            cur.execute(sql)
            spectra = cur.fetchall()
            datum = dict()
            datum[name] = np.array([[s[0], s[1]] for s in spectra])
            return datum

    def calc_prob(self, composition):
        """Calculate the "Anik" probability.

        Arguments
        composition (dict): Definition of the composition
            {"name_1": "frac_1", "name_2": "frac_2", ...}
        """
        # Anik code here
        spectra = self.get_spectra()
        wavelength = self.get_wavelength()
        result = 0
        for k, v in composition.items():
            result = result + spectra[k][:, 1] * float(v) / 100
        result = np.stack([wavelength, result], axis=1)
        return result


if __name__ == "__main__":
    s = SpecTool()
    s.calc_prob({"compounda": 20, "compoundb": 30})
