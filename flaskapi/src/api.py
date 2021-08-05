#!/usr/bin/env python
import logging
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from spec_tool import SpecTool

logger = logging.getLogger("spectool")
app = Flask(__name__)
CORS(app)

spectool = SpecTool()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_spectra')
def get_spectra():
    spectra = spectool.get_spectra(request.args.get("name"))
    spectra = {s[0]: s[1].tolist() for s in spectra.items()}
    return jsonify(spectra)


@app.route('/calc_prob', methods=["POST"])
def calc_prob():
    composition = request.get_json()
    prob = spectool.calc_prob(composition)
    return jsonify(prob)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False)
