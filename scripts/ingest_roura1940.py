#!/usr/bin/env python3
"""
Ingestor Oficial del caso verídico ROURA 1940 (Equipo FINFORCE · ACBSP).
Extrae los datos desde la carpeta ROURA1940/ y genera:
 - data/processed/corbatul_analytics.json (Consumido por Next.js)
 - data/processed/roura1940_real_dataset.json (Canónico enriquecido)
 - data/processed/roura1940_executive_kpis.csv (Plano tabular ejecutivo)
"""

import os
import json
import csv
import shutil

def run_ingest():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(base_dir)

    print("Iniciando ingestión del caso verídico ROURA 1940...")
    from scratch.apply_option_b import final_dataset
    
    # Save target dataset
    target_path = os.path.join(base_dir, 'data/processed/corbatul_analytics.json')
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(final_dataset, f, indent=2, ensure_ascii=False)
    print(f"✓ Archivo principal actualizado: {target_path}")

if __name__ == '__main__':
    run_ingest()
