#!/usr/bin/env python3
"""
Constructor canónico y exhaustivo del dataset oficial para FINNOVA (Compañía FashionClub · Simulación Corbatul).
Incorpora todas las correcciones detalladas (1 a 42) para 2026, 2027, 2028 y 2029.
"""

import os
import json

def build_dataset():
    firms = [
        {"id": "fashionclub", "name": "FashionClub (FINNOVA)", "isOurFirm": True, "color": "#FB923C", "badge": "Nuestra Firma"},
        {"id": "stuart20", "name": "Stuart20", "isOurFirm": False, "color": "#3B82F6", "badge": "Líder 2029"},
        {"id": "roura1940", "name": "Roura1940", "isOurFirm": False, "color": "#10B981", "badge": "Top 2"},
        {"id": "spain10", "name": "Spain10", "isOurFirm": False, "color": "#8B5CF6", "badge": "Top 3"},
        {"id": "smartone", "name": "SmartOne", "isOurFirm": False, "color": "#06B6D4", "badge": "Top 5"},
        {"id": "puntoone", "name": "PuntoOne", "isOurFirm": False, "color": "#EC4899", "badge": "Top 6"},
        {"id": "realman", "name": "RealMan", "isOurFirm": False, "color": "#94A3B8", "badge": "Top 7"}
    ]

    periods = [1, 2, 3, 4]
    years = [2026, 2027, 2028, 2029]

    # Decisiones estructuradas
    decisions = [
        {
            "period": 1,
            "year": 2026,
            "firmId": "fashionclub",
            "priceStandard": 16.20,
            "pricePremium": 27.90,
            "priceSocks": 2.90,
            "channelDiscount": 13.0,
            "marketingBudget": 185000,
            "salesForceHeadcount": 16,
            "productionOrdersStandard": 192000,
            "productionOrdersPremium": 27500,
            "productionOrdersSocks": 25000,
            "plantShifts": 2,
            "maintenanceBudget": 28000,
            "qualityControlBudget": 45000,
            "plantExpansionUnits": 0,
            "rawMaterialPurchaseStandard": 192000,
            "rawMaterialPurchasePremium": 27500,
            "shortTermLoanRequest": 0,
            "longTermDebtRepayment": 292260,
            "dividendPayoutRatio": 0.0,
            "extraordinaryCreditEnding": 1327680
        },
        {
            "period": 2,
            "year": 2027,
            "firmId": "fashionclub",
            "priceStandard": 16.30,
            "pricePremium": 28.10,
            "priceSocks": 3.00,
            "channelDiscount": 13.0,
            "marketingBudget": 110000,
            "salesForceHeadcount": 16,
            "productionOrdersStandard": 192000,
            "productionOrdersPremium": 27500,
            "productionOrdersSocks": 25000,
            "plantShifts": 2,
            "maintenanceBudget": 30000,
            "qualityControlBudget": 45000,
            "plantExpansionUnits": 0,
            "rawMaterialPurchaseStandard": 192000,
            "rawMaterialPurchasePremium": 27500,
            "shortTermLoanRequest": 0,
            "longTermDebtRepayment": 211051,
            "dividendPayoutRatio": 0.0,
            "extraordinaryCreditEnding": 1612439
        },
        {
            "period": 3,
            "year": 2028,
            "firmId": "fashionclub",
            "priceStandard": 16.50,
            "pricePremium": 28.10,
            "priceSocks": 3.00,
            "channelDiscount": 12.0,
            "marketingBudget": 120000,
            "salesForceHeadcount": 17,
            "salesIncentives": {"standard": 3.5, "premium": 4.0, "socks": 2.5},
            "productionOrdersStandard": 192000,
            "productionOrdersPremium": 27500,
            "productionOrdersSocks": 25000,
            "plantShifts": 2,
            "maintenanceBudget": 32000,
            "qualityControlBudget": 48000,
            "plantExpansionUnits": 0,
            "rawMaterialPurchaseStandard": 192000,
            "rawMaterialPurchasePremium": 27500,
            "shortTermLoanRequest": 0,
            "longTermDebtRepayment": 100709,
            "dividendPayoutRatio": 0.0,
            "extraordinaryCreditEnding": 2499420
        },
        {
            "period": 4,
            "year": 2029,
            "firmId": "fashionclub",
            "priceStandard": 16.50,
            "pricePremium": 28.10,
            "priceSocks": 3.00,
            "channelDiscount": 12.0,
            "marketingBudget": 120000,
            "salesForceHeadcount": 18,
            "salesIncentives": {"standard": 3.5, "premium": 4.0, "socks": 2.5},
            "productionOrdersStandard": 192000,
            "productionOrdersPremium": 27500,
            "productionOrdersSocks": 25000,
            "plantShifts": 2,
            "maintenanceBudget": 35000,
            "qualityControlBudget": 50000,
            "plantExpansionUnits": 0,
            "rawMaterialPurchaseStandard": 192000,
            "rawMaterialPurchasePremium": 27500,
            "shortTermLoanRequest": 0,
            "longTermDebtRepayment": 110147,
            "dividendPayoutRatio": 0.0,
            "extraordinaryCreditEnding": 5518020
        }
    ]

    # Historias Causales Exhaustivas (Triada: Punto Inicial -> Decisión en 4 Ejes -> Consecuencias)
    decisionStories = [
        {
            "period": 1,
            "year": 2026,
            "firmId": "fashionclub",
            "roundTitle": "2026 · Expansión Industrial y Reajuste de Márgenes",
            "strategicTheme": "Ampliación de Inmovilizado Material a 6.54M€ y Recomposición de Precios",
            "initialState": {
                "cashStarting": 1916796,
                "inventoryStartingValue": 78183,
                "nominalCapacity": 385000,
                "inheritedSharePrice": 2329.3,
                "inheritedRank": 1,
                "inheritedMarketShare": 14.3,
                "diagnosticContext": "FashionClub parte en 2025 con 1.916.796 € en tesorería, un inventario valorado en 78.183 € y un valor bursátil de partida de 2.329,3 puntos. Los márgenes en calcetines están en negativo severo (-53,3%) y el balance requiere acomodar la adquisición de nueva maquinaria.",
                "criticalChallenge": "Reajustar precios para contrarrestar la inflación de costes fabriles sin estrangular la liquidez operativa durante la ampliación del inmovilizado."
            },
            "decisions": {
                "commercial": {
                    "priceStandard": 16.20,
                    "pricePremium": 27.90,
                    "priceSocks": 2.90,
                    "channelDiscount": 13.0,
                    "marketingBudget": 185000,
                    "salesForceCount": 16,
                    "salesIncentivesSummary": "Sin incentivo extraordinario; canal directo",
                    "commercialRationale": "Fijar Corbatas en 16,20 € para sostener rotación masiva; subir Bufandas a 27,90 € elevando margen al 48,6%; ajustar Calcetines a 2,90 € para recortar pérdidas. Descuento canal al 13%."
                },
                "production": {
                    "ordersStandard": 192000,
                    "ordersPremium": 27500,
                    "ordersSocks": 25000,
                    "plantShifts": 2,
                    "maintenanceBudget": 28000,
                    "qualityControlBudget": 45000,
                    "plantExpansionUnits": 0,
                    "productionRationale": "Ocupación balanceada y ampliación del inmovilizado material a 6.540.000 € para modernizar telares y reducir mermas técnicas."
                },
                "sourcing": {
                    "rawMaterialStandard": 192000,
                    "rawMaterialPremium": 27500,
                    "catalogRangeSummary": "Corbatas 15, Bufandas 7, Calcetines 5",
                    "designLevelSummary": "Nivel de diseño 4 / 4 / 3",
                    "sourcingRationale": "Amplitud de catálogo amplia para captar boutiques y tiendas multimarca."
                },
                "finance": {
                    "shortTermLoan": 0,
                    "debtRepayment": 292260,
                    "dividendPayout": 0.0,
                    "extraordinaryCreditImpact": 1327680,
                    "financeRationale": "Cero endeudamiento bancario nuevo; la adquisición de inmovilizado absorbió la caja existente (1.916.796 €), forzando a financiar el fondo de maniobra con 1.327.680 € de crédito extraordinario."
                },
                "strategicHypothesis": "La modernización de maquinaria y la recomposición de precios consolidarán la rentabilidad bruta de FashionClub por encima del 33%."
            },
            "consequences": {
                "operationalImpact": {
                    "unitsProduced": 244500,
                    "unitsSold": 244434,
                    "utilizationRate": 63.5,
                    "overtimeIncidence": "Turno 2 estable sin recargos nocturnos",
                    "machineBreakdowns": "Sin incidencias por mantenimiento preventivo",
                    "stockoutOccurred": False,
                    "stockoutUnits": 0,
                    "operationalVerdict": "Ventas totales exactas de 244.434 unidades (Corbatas: 192.223, Bufandas: 25.971, Calcetines: 26.240). Inventario monetario final de 59.929 €."
                },
                "financialImpact": {
                    "totalRevenue": 3404863,
                    "grossProfit": 1145916,
                    "grossMargin": 33.7,
                    "cogsSummary": "Coste de ventas de 2.258.947 € (66,3% sobre facturación)",
                    "netIncome": -562464,
                    "netMargin": -16.5,
                    "endingCash": 0,
                    "endingDebt": 1225154,
                    "extraordinaryCredit": 1327680,
                    "financialVerdict": "Facturación neta de 3.404.863 € con margen bruto de 1.145.916 € (33,7%). Gastos operativos de 1.605.718 € y crédito extraordinario al cierre de 1.327.680 €."
                },
                "competitiveImpact": {
                    "endingSharePrice": 2360.3,
                    "sharePriceDelta": 31.0,
                    "marketShare": 15.0,
                    "marketRank": 4,
                    "rankByUnitsSold": 4,
                    "rankByGrossMargin": 5,
                    "competitorMovements": "FashionClub ocupa el cuarto lugar por valor de compañía, con 2.360,3 puntos. Clasificación: 1. Spain10 (2.514,3 pts), 2. Stuart20 (2.416,2 pts), 3. Roura1940 (2.387,6 pts), 4. FashionClub (2.360,3 pts)."
                },
                "lessonsLearned": "La inversión en inmovilizado debió acompañarse de un préstamo sindicado a largo plazo para proteger el saldo de tesorería y evitar el crédito de emergencia, pese al buen desempeño comercial (33,7% de margen bruto)."
            }
        },
        {
            "period": 2,
            "year": 2027,
            "firmId": "fashionclub",
            "roundTitle": "2027 · Reenfoque Promocional y Racionalización del Surtido",
            "strategicTheme": "Pico Histórico de Valor (2.373,1 pts) y Especialización en Bufandas",
            "initialState": {
                "cashStarting": 0,
                "inventoryStartingValue": 59929,
                "nominalCapacity": 385000,
                "inheritedSharePrice": 2360.3,
                "inheritedRank": 4,
                "inheritedMarketShare": 15.0,
                "diagnosticContext": "FashionClub inicia 2027 con valor de 2.360,3 puntos al cierre de 2026. Tesorería líquida disponible de 0 € e inventario monetario valorado en 59.929 €. Saldo de crédito extraordinario de 1.327.680 €.",
                "criticalChallenge": "Optimizar el margen bruto mediante mayor selectividad en marketing y estabilizar la producción de bufandas para frenar el crecimiento de la deuda."
            },
            "decisions": {
                "commercial": {
                    "priceStandard": 16.30,
                    "pricePremium": 28.10,
                    "priceSocks": 3.00,
                    "channelDiscount": 13.0,
                    "marketingBudget": 110000,
                    "salesForceCount": 16,
                    "salesIncentivesSummary": "Sin incentivo extraordinario",
                    "commercialRationale": "Elevar Bufandas a 28,10 € (margen de 49,4%) y Calcetines a 3,00 €. Concentrar el marketing en Bufandas (85.000 €) y Calcetines (25.000 €), llevando Corbatas a 0 € aprovechando su inercia de marca."
                },
                "production": {
                    "ordersStandard": 192000,
                    "ordersPremium": 27500,
                    "ordersSocks": 25000,
                    "plantShifts": 2,
                    "maintenanceBudget": 30000,
                    "qualityControlBudget": 45000,
                    "plantExpansionUnits": 0,
                    "productionRationale": "Ocupación de fábrica en Bufandas al 90% (27.500 uds), Corbatas al 61% y Calcetines al 62,5%."
                },
                "sourcing": {
                    "rawMaterialStandard": 192000,
                    "rawMaterialPremium": 27500,
                    "catalogRangeSummary": "Racionalización de corbatas de 15 a 13 opciones; bufandas 7, calcetines 5",
                    "designLevelSummary": "Nivel de diseño 4 / 4 / 3",
                    "sourcingRationale": "Reducción de 2 modelos en corbatas para abaratar costes de cambio y preparación en máquina."
                },
                "finance": {
                    "shortTermLoan": 0,
                    "debtRepayment": 211051,
                    "dividendPayout": 0.0,
                    "extraordinaryCreditImpact": 1612439,
                    "financeRationale": "Amortización regular de préstamos; crédito extraordinario crece a 1.612.439 € para cubrir desfases de proveedores."
                },
                "strategicHypothesis": "La concentración publicitaria en bufandas maximizará el margen unitario, aprovechando la alta demanda del canal minorista."
            },
            "consequences": {
                "operationalImpact": {
                    "unitsProduced": 244500,
                    "unitsSold": 245245,
                    "utilizationRate": 63.5,
                    "overtimeIncidence": "Turno 2 óptimo",
                    "machineBreakdowns": "Ninguna parada mayor",
                    "stockoutOccurred": False,
                    "stockoutUnits": 0,
                    "operationalVerdict": "Ventas exactas de 245.245 unidades (Corbatas: 191.996, Bufandas: 26.977, Calcetines: 26.272). Ocupación del 90% en bufandas con stock contable final de 58.945 €."
                },
                "financialImpact": {
                    "totalRevenue": 3450661,
                    "grossProfit": 1105437,
                    "grossMargin": 32.0,
                    "cogsSummary": "Coste de ventas de 2.345.224 €",
                    "netIncome": -646078,
                    "netMargin": -18.7,
                    "endingCash": 0,
                    "endingDebt": 1042842,
                    "extraordinaryCredit": 1612439,
                    "financialVerdict": "Facturación neta de 3.450.661 € con margen bruto monetario de 1.105.437 € (32,0%). Crédito extraordinario al cierre de 1.612.439 €."
                },
                "competitiveImpact": {
                    "endingSharePrice": 2373.1,
                    "sharePriceDelta": 12.8,
                    "marketShare": 16.6,
                    "marketRank": 4,
                    "rankByUnitsSold": 4,
                    "rankByGrossMargin": 5,
                    "competitorMovements": "FashionClub alcanza su PICO HISTÓRICO de 2.373,1 puntos en valor de compañía, con 16,6% de participación de mercado."
                },
                "lessonsLearned": "Las ventas de corbatas se mantuvieron prácticamente estables respecto al ejercicio anterior, pasando de 192.223 a 191.996 unidades. Esta variación refleja una disminución de 227 unidades; sin embargo, los resultados disponibles no permiten atribuir directamente este comportamiento a la reducción del marketing ni confirmar un posicionamiento orgánico de marca."
            }
        },
        {
            "period": 3,
            "year": 2028,
            "firmId": "fashionclub",
            "roundTitle": "2028 · Activación de Incentivos a la Red de Ventas",
            "strategicTheme": "Salto del Margen al 35,8% y Reestructuración de Comisiones",
            "initialState": {
                "cashStarting": 0,
                "inventoryStartingValue": 58945,
                "nominalCapacity": 385000,
                "inheritedSharePrice": 2373.1,
                "inheritedRank": 4,
                "inheritedMarketShare": 16.6,
                "diagnosticContext": "FashionClub arranca 2028 tras alcanzar su pico de valoración (2.373,1 pts). Tesorería en 0 € e inventario monetario registrado en balance anterior de 58.945 €.",
                "criticalChallenge": "Impulsar las ventas físicas y mejorar la penetración en retail reduciendo el descuento general al canal."
            },
            "decisions": {
                "commercial": {
                    "priceStandard": 16.50,
                    "pricePremium": 28.10,
                    "priceSocks": 3.00,
                    "channelDiscount": 12.0,
                    "marketingBudget": 120000,
                    "salesForceCount": 17,
                    "salesIncentivesSummary": "Corbatas 3.5%, Bufandas 4.0%, Calcetines 2.5%",
                    "commercialRationale": "Fijar Corbatas en 16,50 €. Reducir descuento al canal del 13% al 12% para retener margen, y a cambio introducir incentivos directos a la fuerza de ventas (3,5% corbatas, 4% bufandas, 2,5% calcetines). Marketing en 120.000 € (60k corbatas, 60k bufandas)."
                },
                "production": {
                    "ordersStandard": 192000,
                    "ordersPremium": 27500,
                    "ordersSocks": 25000,
                    "plantShifts": 2,
                    "maintenanceBudget": 32000,
                    "qualityControlBudget": 48000,
                    "plantExpansionUnits": 0,
                    "productionRationale": "Ocupación en bufandas al 91,7% con capacidad al límite (27.500 de 30.000 uds nominales)."
                },
                "sourcing": {
                    "rawMaterialStandard": 192000,
                    "rawMaterialPremium": 27500,
                    "catalogRangeSummary": "Corbatas optimizadas a 12 modelos; bufandas 7, calcetines 5",
                    "designLevelSummary": "Nivel de diseño 4 / 4 / 3",
                    "sourcingRationale": "Consolidación de catálogo con proveedores estables código 60/60/60."
                },
                "finance": {
                    "shortTermLoan": 0,
                    "debtRepayment": 100709,
                    "dividendPayout": 0.0,
                    "extraordinaryCreditImpact": 2499420,
                    "financeRationale": "Devolución de deuda bancaria LP; el crédito extraordinario acumulado sube a 2.499.420 € al absorber gastos de personal e incentivos."
                },
                "strategicHypothesis": "La combinación de incentivos directos y menor descuento al canal aumentará el margen bruto en más de 3 puntos porcentuales."
            },
            "consequences": {
                "operationalImpact": {
                    "unitsProduced": 244500,
                    "unitsSold": 244018,
                    "utilizationRate": 63.5,
                    "overtimeIncidence": "Sin horas extras no planificadas",
                    "machineBreakdowns": "Calibración perfecta de telares",
                    "stockoutOccurred": False,
                    "stockoutUnits": 0,
                    "operationalVerdict": "Ventas exactas de 244.018 unidades (Corbatas: 192.002, Bufandas: 27.488, Calcetines: 24.528). Inventario monetario remanente de 59.609 €."
                },
                "financialImpact": {
                    "totalRevenue": 3532401,
                    "grossProfit": 1265816,
                    "grossMargin": 35.8,
                    "cogsSummary": "Coste de ventas de 2.266.585 €",
                    "netIncome": -1457017,
                    "netMargin": -41.2,
                    "endingCash": 0,
                    "endingDebt": 987516,
                    "extraordinaryCredit": 2499420,
                    "financialVerdict": "Facturación neta de 3.532.401 € con margen bruto de 1.265.816 € (35,8%). Resultado de explotación de -1.401.866 € y resultado neto de -1.457.017 €."
                },
                "competitiveImpact": {
                    "endingSharePrice": 2288.2,
                    "sharePriceDelta": -84.9,
                    "marketShare": 16.3,
                    "marketRank": 3,
                    "rankByUnitsSold": 4,
                    "rankByGrossMargin": 5,
                    "competitorMovements": "Ranking por valor de compañía: tercer lugar de siete empresas con 2.288,2 puntos (tras Stuart20 con 2.740,0 pts y Roura1940 con 2.703,9 pts). Participación de mercado del 16,3%."
                },
                "lessonsLearned": "Los resultados comerciales de 2028 fueron diferentes según la línea de producto. Las ventas de corbatas aumentaron en 6 unidades y las de bufandas en 511 unidades, mientras que los calcetines disminuyeron en 1.744 unidades. En conjunto, las ventas totales bajaron en 1.227 unidades respecto a 2027. Por ello, no se puede afirmar que existió una mejora general de la rotación de productos."
            }
        },
        {
            "period": 4,
            "year": 2029,
            "firmId": "fashionclub",
            "roundTitle": "2029 · Cierre de Gestión y Récord de Margen Comercial",
            "strategicTheme": "Récord del 39,5% de Margen Bruto y Cuarta Posición en la Industria",
            "initialState": {
                "cashStarting": 0,
                "inventoryStartingValue": 59609,
                "nominalCapacity": 385000,
                "inheritedSharePrice": 2288.2,
                "inheritedRank": 3,
                "inheritedMarketShare": 16.3,
                "diagnosticContext": "Ronda final de la simulación. FashionClub parte con 2.288,2 puntos en valor de compañía, tesorería en 0 € e inventario monetario registrado en balance de 59.609 €.",
                "criticalChallenge": "Defender el valor de compañía consolidando el máximo margen comercial histórico y presentar una auditoría nítida ante el comité evaluador."
            },
            "decisions": {
                "commercial": {
                    "priceStandard": 16.50,
                    "pricePremium": 28.10,
                    "priceSocks": 3.00,
                    "channelDiscount": 12.0,
                    "marketingBudget": 120000,
                    "salesForceCount": 18,
                    "salesIncentivesSummary": "Corbatas 3.5%, Bufandas 4.0%, Calcetines 2.5%",
                    "commercialRationale": "Mantener precios en su nivel óptimo: 16,50 € corbatas, 28,10 € bufandas y 3,00 € calcetines. Presupuesto de marketing de 120.000 € (60k corbatas, 60k bufandas) con incentivos mantenidos."
                },
                "production": {
                    "ordersStandard": 192000,
                    "ordersPremium": 27500,
                    "ordersSocks": 25000,
                    "plantShifts": 2,
                    "maintenanceBudget": 35000,
                    "qualityControlBudget": 50000,
                    "plantExpansionUnits": 0,
                    "productionRationale": "Ocupación máxima en Bufandas (91,7%, 27.500 uds vendidas de 30.000 de capacidad); Corbatas al 61% (193.740 uds vendidas)."
                },
                "sourcing": {
                    "rawMaterialStandard": 192000,
                    "rawMaterialPremium": 27500,
                    "catalogRangeSummary": "Corbatas 12, Bufandas 7, Calcetines 5",
                    "designLevelSummary": "Nivel de diseño 4 / 4 / 3",
                    "sourcingRationale": "Gama consolidada con mínima merma y alta satisfacción de clientes."
                },
                "finance": {
                    "shortTermLoan": 0,
                    "debtRepayment": 110147,
                    "dividendPayout": 0.0,
                    "extraordinaryCreditImpact": 5518020,
                    "financeRationale": "El saldo del crédito extraordinario cierra en 5.518.020 € tras absorber el aumento de gastos generales (3.419.752 €) y personal (1.156.958 €)."
                },
                "strategicHypothesis": "La madurez de las 3 líneas y la excelencia de la línea de bufandas garantizarán una sólida posición competitiva final."
            },
            "consequences": {
                "operationalImpact": {
                    "unitsProduced": 244500,
                    "unitsSold": 247270,
                    "utilizationRate": 63.5,
                    "overtimeIncidence": "Sin sobrecostes en fábrica",
                    "machineBreakdowns": "Cero paradas imprevistas",
                    "stockoutOccurred": False,
                    "stockoutUnits": 0,
                    "operationalVerdict": "Ventas totales de 247.270 unidades (Corbatas: 193.740, Bufandas: 27.500, Calcetines: 26.030). Ocupación del 91,7% en bufandas. Inventario monetario final de 45.585 €."
                },
                "financialImpact": {
                    "totalRevenue": 3561899,
                    "grossProfit": 1406968,
                    "grossMargin": 39.5,
                    "cogsSummary": "Coste de ventas reducido a 2.154.931 € (60,5% sobre ventas)",
                    "netIncome": -3399251,
                    "netMargin": -95.4,
                    "endingCash": 0,
                    "endingDebt": 753893,
                    "extraordinaryCredit": 5518020,
                    "financialVerdict": "Facturación neta de 3.561.899 € con margen bruto de 1.406.968 € (39,5%). Resultado de explotación de -3.532.563 €, resultado neto de -3.399.251 € y crédito extraordinario al cierre de 5.518.020 €."
                },
                "competitiveImpact": {
                    "endingSharePrice": 2231.9,
                    "sharePriceDelta": -56.3,
                    "marketShare": 14.3,
                    "marketRank": 4,
                    "rankByUnitsSold": 4,
                    "rankByGrossMargin": 4,
                    "competitorMovements": "FashionClub ocupa el cuarto lugar por valor de compañía con 2.231,9 puntos (-56,3 pts). Clasificación: 1. Stuart20 (3.005,2 pts), 2. Roura1940 (2.924,3 pts), 3. Spain10 (2.248,7 pts), 4. FashionClub (2.231,9 pts), 5. SmartOne (2.098,0 pts), 6. PuntoOne (2.084,4 pts), 7. RealMan (1.428,3 pts)."
                },
                "lessonsLearned": "FashionClub alcanzó su mejor margen bruto histórico, situándolo en 39,5 %. Sin embargo, dentro de la comparación de las siete empresas, ocupa el cuarto lugar en margen bruto, por detrás de Stuart20, PuntoOne y Roura1940."
            }
        }
    ]

    # Datos financieros anuales auditados
    financials = [
        {
            "period": 1,
            "year": 2026,
            "firmId": "fashionclub",
            "totalRevenue": 3404863,
            "costOfGoodsSold": 2258947,
            "grossProfit": 1145916,
            "grossMargin": 0.337,
            "marketingExpenses": 185000,
            "personnelExpenses": 665483,
            "rdExpenses": 257620,
            "depreciationExpenses": 160800,
            "insolvencyProvisions": -7993,
            "generalExpenses": 344808,
            "operatingExpenses": 1605718,
            "operatingIncome": -459803,
            "operatingMargin": -0.1350,
            "interestExpenses": 133379,
            "extraordinaryItems": 30718,
            "taxExpenses": 0,
            "netIncome": -562464,
            "netMargin": -0.1652,
            "balanceSheet": {
                "cashAndEquivalents": 0,
                "accountsReceivable": 303057,
                "inventoryValue": 59929,
                "currentAssets": 375486,
                "propertyPlantEquipment": 5126700,
                "totalAssets": 5957186,
                "shortTermDebt": 297748,
                "extraordinaryCredit": 1327680,
                "accountsPayable": 320000,
                "currentLiabilities": 1945428,
                "longTermDebt": 927406,
                "totalLiabilities": 2872834,
                "shareholdersEquity": 3417274
            }
        },
        {
            "period": 2,
            "year": 2027,
            "firmId": "fashionclub",
            "totalRevenue": 3450661,
            "costOfGoodsSold": 2345224,
            "grossProfit": 1105437,
            "grossMargin": 0.320,
            "marketingExpenses": 110000,
            "personnelExpenses": 793464,
            "rdExpenses": 117910,
            "depreciationExpenses": 162050,
            "insolvencyProvisions": -11140,
            "generalExpenses": 504171,
            "operatingExpenses": 1676455,
            "operatingIncome": -571017,
            "operatingMargin": -0.1655,
            "interestExpenses": 93061,
            "extraordinaryItems": 18000,
            "taxExpenses": 0,
            "netIncome": -646078,
            "netMargin": -0.1872,
            "balanceSheet": {
                "cashAndEquivalents": 0,
                "accountsReceivable": 269638,
                "inventoryValue": 58945,
                "currentAssets": 328583,
                "propertyPlantEquipment": 4801150,
                "totalAssets": 5434733,
                "shortTermDebt": 326487,
                "extraordinaryCredit": 1612439,
                "accountsPayable": 350000,
                "currentLiabilities": 2288926,
                "longTermDebt": 716355,
                "totalLiabilities": 3005281,
                "shareholdersEquity": 2771196
            }
        },
        {
            "period": 3,
            "year": 2028,
            "firmId": "fashionclub",
            "totalRevenue": 3532401,
            "costOfGoodsSold": 2266585,
            "grossProfit": 1265816,
            "grossMargin": 0.358,
            "marketingExpenses": 120000,
            "personnelExpenses": 959377,
            "rdExpenses": 117910,
            "depreciationExpenses": 150800,
            "insolvencyProvisions": 2075,
            "generalExpenses": 1317519,
            "operatingExpenses": 2667681,
            "operatingIncome": -1401866,
            "operatingMargin": -0.3969,
            "interestExpenses": 73152,
            "extraordinaryItems": 18000,
            "taxExpenses": 0,
            "netIncome": -1457017,
            "netMargin": -0.4125,
            "balanceSheet": {
                "cashAndEquivalents": 0,
                "accountsReceivable": 275864,
                "inventoryValue": 59609,
                "currentAssets": 335473,
                "propertyPlantEquipment": 4286850,
                "totalAssets": 4927323,
                "shortTermDebt": 371870,
                "extraordinaryCredit": 2499420,
                "accountsPayable": 372599,
                "currentLiabilities": 3243889,
                "longTermDebt": 615646,
                "totalLiabilities": 3859534,
                "shareholdersEquity": 1314179
            }
        },
        {
            "period": 4,
            "year": 2029,
            "firmId": "fashionclub",
            "totalRevenue": 3561899,
            "costOfGoodsSold": 2154931,
            "grossProfit": 1406968,
            "grossMargin": 0.395,
            "marketingExpenses": 120000,
            "personnelExpenses": 1156958,
            "rdExpenses": 117910,
            "depreciationExpenses": 123300,
            "insolvencyProvisions": 1611,
            "generalExpenses": 3419752,
            "operatingExpenses": 4939531,
            "operatingIncome": -3532563,
            "operatingMargin": -0.9918,
            "interestExpenses": 79688,
            "extraordinaryItems": 213000,
            "taxExpenses": 0,
            "netIncome": -3399251,
            "netMargin": -0.9543,
            "balanceSheet": {
                "cashAndEquivalents": 0,
                "accountsReceivable": 280696,
                "inventoryValue": 45585,
                "currentAssets": 326281,
                "propertyPlantEquipment": 3975050,
                "totalAssets": 4606331,
                "shortTermDebt": 248394,
                "extraordinaryCredit": 5518020,
                "accountsPayable": 665880,
                "currentLiabilities": 6432294,
                "longTermDebt": 505499,
                "totalLiabilities": 6937794,
                "shareholdersEquity": -2085073
            }
        }
    ]

    # Operaciones por periodo exactas
    operations = [
        {
            "period": 1,
            "year": 2026,
            "firmId": "fashionclub",
            "nominalCapacity": 385000,
            "effectiveCapacity": 385000,
            "actualProductionUnits": 244500,
            "capacityUtilizationRate": 0.635,
            "inventoryBeginValue": 78183,
            "unitsAvailableForSale": 250388,
            "unitsSold": 244434,
            "inventoryEndValue": 59929,
            "stockoutUnits": 0,
            "stockoutRate": 0.0,
            "unitProductionCost": 9.24,
            "products": {
                "standard": {
                    "unitsSold": 192223,
                    "revenue": 2690000,
                    "price": 16.20,
                    "margin": 32.3,
                    "catalogRange": 15,
                    "narrative": "Ventas de 192.223 unidades con margen del 32,3% y precio unitario de 16,20 €."
                },
                "premium": {
                    "unitsSold": 25971,
                    "revenue": 653000,
                    "price": 27.90,
                    "margin": 48.6,
                    "catalogRange": 7,
                    "narrative": "Ventas de 25.971 unidades con margen del 48,6% y precio unitario de 27,90 €."
                },
                "socks": {
                    "unitsSold": 26240,
                    "revenue": 61863,
                    "price": 2.90,
                    "margin": -51.3,
                    "catalogRange": 5,
                    "narrative": "Ventas de 26.240 unidades con margen del -51,3% y precio unitario de 2,90 €."
                }
            }
        },
        {
            "period": 2,
            "year": 2027,
            "firmId": "fashionclub",
            "nominalCapacity": 385000,
            "effectiveCapacity": 385000,
            "actualProductionUnits": 244500,
            "capacityUtilizationRate": 0.635,
            "inventoryBeginValue": 59929,
            "unitsAvailableForSale": 252888,
            "unitsSold": 245245,
            "inventoryEndValue": 58945,
            "stockoutUnits": 0,
            "stockoutRate": 0.0,
            "unitProductionCost": 9.59,
            "products": {
                "standard": {
                    "unitsSold": 191996,
                    "revenue": 2725000,
                    "price": 16.30,
                    "margin": 30.1,
                    "catalogRange": 13,
                    "narrative": "Ventas de 191.996 unidades con margen del 30,1% y precio unitario de 16,30 €."
                },
                "premium": {
                    "unitsSold": 26977,
                    "revenue": 662000,
                    "price": 28.10,
                    "margin": 49.4,
                    "catalogRange": 7,
                    "narrative": "Ventas de 26.977 unidades con margen del 49,4% y precio unitario de 28,10 €."
                },
                "socks": {
                    "unitsSold": 26272,
                    "revenue": 63661,
                    "price": 3.00,
                    "margin": -57.3,
                    "catalogRange": 5,
                    "narrative": "Ventas de 26.272 unidades con margen del -57,3% y precio unitario de 3,00 €."
                }
            }
        },
        {
            "period": 3,
            "year": 2028,
            "firmId": "fashionclub",
            "nominalCapacity": 385000,
            "effectiveCapacity": 385000,
            "actualProductionUnits": 244500,
            "capacityUtilizationRate": 0.635,
            "inventoryBeginValue": 58945,
            "unitsAvailableForSale": 253888,
            "unitsSold": 244018,
            "inventoryEndValue": 59609,
            "stockoutUnits": 0,
            "stockoutRate": 0.0,
            "unitProductionCost": 9.29,
            "products": {
                "standard": {
                    "unitsSold": 192002,
                    "revenue": 2787869,
                    "price": 16.50,
                    "margin": 34.2,
                    "catalogRange": 12,
                    "narrative": "Ventas de 192.002 unidades con margen del 34,2% y precio unitario de 16,50 €."
                },
                "premium": {
                    "unitsSold": 27488,
                    "revenue": 679778,
                    "price": 28.10,
                    "margin": 50.5,
                    "catalogRange": 7,
                    "narrative": "Ventas de 27.488 unidades con margen del 50,5% y precio unitario de 28,10 €."
                },
                "socks": {
                    "unitsSold": 24528,
                    "revenue": 64754,
                    "price": 3.00,
                    "margin": -48.4,
                    "catalogRange": 5,
                    "narrative": "Ventas de 24.528 unidades con margen del -48,4% y precio unitario de 3,00 €."
                }
            }
        },
        {
            "period": 4,
            "year": 2029,
            "firmId": "fashionclub",
            "nominalCapacity": 385000,
            "effectiveCapacity": 385000,
            "actualProductionUnits": 244500,
            "capacityUtilizationRate": 0.635,
            "inventoryBeginValue": 59609,
            "unitsAvailableForSale": 254370,
            "unitsSold": 247270,
            "inventoryEndValue": 45585,
            "stockoutUnits": 0,
            "stockoutRate": 0.0,
            "unitProductionCost": 8.72,
            "products": {
                "standard": {
                    "unitsSold": 193740,
                    "revenue": 2813105,
                    "price": 16.50,
                    "margin": 38.1,
                    "catalogRange": 12,
                    "narrative": "Ventas de 193.740 unidades con margen del 38,1% y precio unitario de 16,50 €."
                },
                "premium": {
                    "unitsSold": 27500,
                    "revenue": 680075,
                    "price": 28.10,
                    "margin": 52.3,
                    "catalogRange": 7,
                    "narrative": "Ventas de 27.500 unidades con margen del 52,3% y precio unitario de 28,10 €."
                },
                "socks": {
                    "unitsSold": 26030,
                    "revenue": 68719,
                    "price": 3.00,
                    "margin": -30.9,
                    "catalogRange": 5,
                    "narrative": "Ventas de 26.030 unidades con margen del -30,9% y precio unitario de 3,00 €."
                }
            }
        }
    ]

    # Componentes de valor específicos por año (Pilar 1 a 7)
    valuationComponentsByYear = {
        2026: [
            {"parameter": "Resultados Económicos", "score": 775, "industryMean": 796, "status": "Solidez operativa inicial"},
            {"parameter": "Patrimonio - Solvencia", "score": 234, "industryMean": 250, "status": "Inversión en planta"},
            {"parameter": "Valor de Marca", "score": 206, "industryMean": 205, "status": "Posicionamiento estable"},
            {"parameter": "Valor Producto + Distribución", "score": 290, "industryMean": 266, "status": "Superior a la media", "isTop": True},
            {"parameter": "Presupuestación - Resultados", "score": 394, "industryMean": 345, "status": "Alta disciplina presupuestaria", "isTop": True},
            {"parameter": "Presupuestación - Balance", "score": 305, "industryMean": 271, "status": "Previsión patrimonial certera", "isTop": True},
            {"parameter": "Participación de Mercado", "score": 110, "industryMean": 103, "status": "15,0% de cuota de mercado", "isTop": True}
        ],
        2027: [
            {"parameter": "Resultados Económicos", "score": 755, "industryMean": 813, "status": "Margen bufandas en ascenso"},
            {"parameter": "Patrimonio - Solvencia", "score": 299, "industryMean": 293, "status": "Supera la media sectorial", "isTop": True},
            {"parameter": "Valor de Marca", "score": 200, "industryMean": 207, "status": "Alineado con el sector"},
            {"parameter": "Valor Producto + Distribución", "score": 326, "industryMean": 293, "status": "Destacado en retail", "isTop": True},
            {"parameter": "Presupuestación - Resultados", "score": 362, "industryMean": 286, "status": "Control de desviaciones", "isTop": True},
            {"parameter": "Presupuestación - Balance", "score": 313, "industryMean": 225, "status": "Fuerte rigor en balance", "isTop": True},
            {"parameter": "Participación de Mercado", "score": 120, "industryMean": 105, "status": "16,6% de cuota de mercado", "isTop": True}
        ],
        2028: [
            {"parameter": "Resultados Económicos", "score": 723, "industryMean": 824, "status": "Margen bruto al 35,8%"},
            {"parameter": "Patrimonio - Solvencia", "score": 203, "industryMean": 223, "status": "Presión por crédito extraordinario"},
            {"parameter": "Valor de Marca", "score": 202, "industryMean": 207, "status": "Marca reconocida"},
            {"parameter": "Valor Producto + Distribución", "score": 333, "industryMean": 313, "status": "Excelente rotación", "isTop": True},
            {"parameter": "Presupuestación - Resultados", "score": 410, "industryMean": 296, "status": "Puntaje destacado", "isTop": True},
            {"parameter": "Presupuestación - Balance", "score": 304, "industryMean": 224, "status": "Rigor presupuestario", "isTop": True},
            {"parameter": "Participación de Mercado", "score": 115, "industryMean": 105, "status": "16,3% de cuota de mercado", "isTop": True}
        ],
        2029: [
            {"parameter": "Resultados Económicos", "score": 705, "industryMean": 873, "status": "Ajustado por gastos de estructura"},
            {"parameter": "Patrimonio - Solvencia", "score": 173, "industryMean": 212, "status": "Impactado por crédito extraordinario"},
            {"parameter": "Valor de Marca", "score": 206, "industryMean": 219, "status": "Posicionamiento estable en canal retail"},
            {"parameter": "Valor Producto + Distribución", "score": 342, "industryMean": 331, "status": "Superior a la media del mercado", "isTop": True},
            {"parameter": "Presupuestación - Resultados", "score": 426, "industryMean": 311, "status": "Excelente precisión en previsión", "isTop": True},
            {"parameter": "Presupuestación - Balance", "score": 281, "industryMean": 231, "status": "Alta disciplina de balance", "isTop": True},
            {"parameter": "Participación de Mercado", "score": 100, "industryMean": 106, "status": "14,3% de cuota de mercado"}
        ]
    }

    # Competidores detallados con rankings exactos diferenciados para cada año
    competitors = [
        # --- 2026 (P1) ---
        {"period": 1, "year": 2026, "firmId": "spain10", "firmName": "Spain10", "isOurFirm": False, "color": "#8B5CF6", "sharePrice": 2514.3, "unitsSold": 195000, "totalRevenue": 2700000, "grossMargin": 0.360, "netIncome": -400000, "marketShareUnits": 0.120, "marketShareUnitsPct": 12.0, "marketShareRevenue": 0.12, "rankBySharePrice": 1, "rankByUnitsSold": 3, "rankByGrossMargin": 3, "liquidityRatio": 22.0},
        {"period": 1, "year": 2026, "firmId": "stuart20", "firmName": "Stuart20", "isOurFirm": False, "color": "#3B82F6", "sharePrice": 2416.2, "unitsSold": 240000, "totalRevenue": 3300000, "grossMargin": 0.490, "netIncome": 200000, "marketShareUnits": 0.147, "marketShareUnitsPct": 14.7, "marketShareRevenue": 0.15, "rankBySharePrice": 2, "rankByUnitsSold": 2, "rankByGrossMargin": 1, "liquidityRatio": 110.0},
        {"period": 1, "year": 2026, "firmId": "roura1940", "firmName": "Roura1940", "isOurFirm": False, "color": "#10B981", "sharePrice": 2387.6, "unitsSold": 215000, "totalRevenue": 2850000, "grossMargin": 0.410, "netIncome": -50000, "marketShareUnits": 0.132, "marketShareUnitsPct": 13.2, "marketShareRevenue": 0.13, "rankBySharePrice": 3, "rankByUnitsSold": 4, "rankByGrossMargin": 2, "liquidityRatio": 65.0},
        {"period": 1, "year": 2026, "firmId": "fashionclub", "firmName": "FashionClub (FINNOVA)", "isOurFirm": True, "color": "#FB923C", "sharePrice": 2360.3, "unitsSold": 244434, "totalRevenue": 3404863, "grossMargin": 0.337, "netIncome": -562464, "marketShareUnits": 0.150, "marketShareUnitsPct": 15.0, "marketShareRevenue": 0.15, "rankBySharePrice": 4, "rankByUnitsSold": 1, "rankByGrossMargin": 4, "liquidityRatio": 12.0},
        {"period": 1, "year": 2026, "firmId": "puntoone", "firmName": "PuntoOne", "isOurFirm": False, "color": "#EC4899", "sharePrice": 2256.6, "unitsSold": 235000, "totalRevenue": 3100000, "grossMargin": 0.330, "netIncome": -600000, "marketShareUnits": 0.144, "marketShareUnitsPct": 14.4, "marketShareRevenue": 0.14, "rankBySharePrice": 5, "rankByUnitsSold": 5, "rankByGrossMargin": 5, "liquidityRatio": 18.0},
        {"period": 1, "year": 2026, "firmId": "smartone", "firmName": "SmartOne", "isOurFirm": False, "color": "#06B6D4", "sharePrice": 2065.2, "unitsSold": 240000, "totalRevenue": 3200000, "grossMargin": 0.280, "netIncome": -1200000, "marketShareUnits": 0.147, "marketShareUnitsPct": 14.7, "marketShareRevenue": 0.14, "rankBySharePrice": 6, "rankByUnitsSold": 2, "rankByGrossMargin": 6, "liquidityRatio": 8.0},
        {"period": 1, "year": 2026, "firmId": "realman", "firmName": "RealMan", "isOurFirm": False, "color": "#94A3B8", "sharePrice": 1593.7, "unitsSold": 70000, "totalRevenue": 950000, "grossMargin": 0.100, "netIncome": -3500000, "marketShareUnits": 0.043, "marketShareUnitsPct": 4.3, "marketShareRevenue": 0.04, "rankBySharePrice": 7, "rankByUnitsSold": 7, "rankByGrossMargin": 7, "liquidityRatio": 1.5},

        # --- 2027 (P2) ---
        {"period": 2, "year": 2027, "firmId": "spain10", "firmName": "Spain10", "isOurFirm": False, "color": "#8B5CF6", "sharePrice": 2809.5, "unitsSold": 190000, "totalRevenue": 2600000, "grossMargin": 0.380, "netIncome": -200000, "marketShareUnits": 0.129, "marketShareUnitsPct": 12.9, "marketShareRevenue": 0.12, "rankBySharePrice": 1, "rankByUnitsSold": 4, "rankByGrossMargin": 3, "liquidityRatio": 25.0},
        {"period": 2, "year": 2027, "firmId": "roura1940", "firmName": "Roura1940", "isOurFirm": False, "color": "#10B981", "sharePrice": 2646.8, "unitsSold": 225000, "totalRevenue": 2980000, "grossMargin": 0.420, "netIncome": -80000, "marketShareUnits": 0.152, "marketShareUnitsPct": 15.2, "marketShareRevenue": 0.14, "rankBySharePrice": 2, "rankByUnitsSold": 3, "rankByGrossMargin": 2, "liquidityRatio": 62.0},
        {"period": 2, "year": 2027, "firmId": "stuart20", "firmName": "Stuart20", "isOurFirm": False, "color": "#3B82F6", "sharePrice": 2448.6, "unitsSold": 250000, "totalRevenue": 3450000, "grossMargin": 0.500, "netIncome": 300000, "marketShareUnits": 0.169, "marketShareUnitsPct": 16.9, "marketShareRevenue": 0.16, "rankBySharePrice": 3, "rankByUnitsSold": 1, "rankByGrossMargin": 1, "liquidityRatio": 115.0},
        {"period": 2, "year": 2027, "firmId": "fashionclub", "firmName": "FashionClub (FINNOVA)", "isOurFirm": True, "color": "#FB923C", "sharePrice": 2373.1, "unitsSold": 245245, "totalRevenue": 3450661, "grossMargin": 0.320, "netIncome": -646078, "marketShareUnits": 0.166, "marketShareUnitsPct": 16.6, "marketShareRevenue": 0.16, "rankBySharePrice": 4, "rankByUnitsSold": 2, "rankByGrossMargin": 4, "liquidityRatio": 8.0},
        {"period": 2, "year": 2027, "firmId": "puntoone", "firmName": "PuntoOne", "isOurFirm": False, "color": "#EC4899", "sharePrice": 1777.2, "unitsSold": 230000, "totalRevenue": 3000000, "grossMargin": 0.310, "netIncome": -1500000, "marketShareUnits": 0.156, "marketShareUnitsPct": 15.6, "marketShareRevenue": 0.14, "rankBySharePrice": 5, "rankByUnitsSold": 5, "rankByGrossMargin": 5, "liquidityRatio": 12.0},
        {"period": 2, "year": 2027, "firmId": "smartone", "firmName": "SmartOne", "isOurFirm": False, "color": "#06B6D4", "sharePrice": 1581.4, "unitsSold": 220000, "totalRevenue": 2900000, "grossMargin": 0.260, "netIncome": -2100000, "marketShareUnits": 0.149, "marketShareUnitsPct": 14.9, "marketShareRevenue": 0.13, "rankBySharePrice": 6, "rankByUnitsSold": 6, "rankByGrossMargin": 6, "liquidityRatio": 6.0},
        {"period": 2, "year": 2027, "firmId": "realman", "firmName": "RealMan", "isOurFirm": False, "color": "#94A3B8", "sharePrice": 1565.6, "unitsSold": 68000, "totalRevenue": 920000, "grossMargin": 0.080, "netIncome": -4000000, "marketShareUnits": 0.046, "marketShareUnitsPct": 4.6, "marketShareRevenue": 0.04, "rankBySharePrice": 7, "rankByUnitsSold": 7, "rankByGrossMargin": 7, "liquidityRatio": 1.2},

        # --- 2028 (P3) ---
        {"period": 3, "year": 2028, "firmId": "stuart20", "firmName": "Stuart20", "isOurFirm": False, "color": "#3B82F6", "sharePrice": 2740.0, "unitsSold": 260000, "totalRevenue": 3600000, "grossMargin": 0.510, "netIncome": 400000, "marketShareUnits": 0.174, "marketShareUnitsPct": 17.4, "marketShareRevenue": 0.16, "rankBySharePrice": 1, "rankByUnitsSold": 2, "rankByGrossMargin": 1, "liquidityRatio": 120.0},
        {"period": 3, "year": 2028, "firmId": "roura1940", "firmName": "Roura1940", "isOurFirm": False, "color": "#10B981", "sharePrice": 2703.9, "unitsSold": 235000, "totalRevenue": 3100000, "grossMargin": 0.430, "netIncome": -70000, "marketShareUnits": 0.157, "marketShareUnitsPct": 15.7, "marketShareRevenue": 0.14, "rankBySharePrice": 2, "rankByUnitsSold": 4, "rankByGrossMargin": 2, "liquidityRatio": 60.0},
        {"period": 3, "year": 2028, "firmId": "fashionclub", "firmName": "FashionClub (FINNOVA)", "isOurFirm": True, "color": "#FB923C", "sharePrice": 2288.2, "unitsSold": 244018, "totalRevenue": 3532401, "grossMargin": 0.358, "netIncome": -1457017, "marketShareUnits": 0.163, "marketShareUnitsPct": 16.3, "marketShareRevenue": 0.16, "rankBySharePrice": 3, "rankByUnitsSold": 3, "rankByGrossMargin": 3, "liquidityRatio": 5.8},
        {"period": 3, "year": 2028, "firmId": "puntoone", "firmName": "PuntoOne", "isOurFirm": False, "color": "#EC4899", "sharePrice": 2169.5, "unitsSold": 280000, "totalRevenue": 3800000, "grossMargin": 0.420, "netIncome": -1000000, "marketShareUnits": 0.187, "marketShareUnitsPct": 18.7, "marketShareRevenue": 0.17, "rankBySharePrice": 4, "rankByUnitsSold": 1, "rankByGrossMargin": 4, "liquidityRatio": 16.0},
        {"period": 3, "year": 2028, "firmId": "smartone", "firmName": "SmartOne", "isOurFirm": False, "color": "#06B6D4", "sharePrice": 1929.0, "unitsSold": 240000, "totalRevenue": 3300000, "grossMargin": 0.260, "netIncome": -1800000, "marketShareUnits": 0.160, "marketShareUnitsPct": 16.0, "marketShareRevenue": 0.15, "rankBySharePrice": 5, "rankByUnitsSold": 5, "rankByGrossMargin": 6, "liquidityRatio": 6.0},
        {"period": 3, "year": 2028, "firmId": "spain10", "firmName": "Spain10", "isOurFirm": False, "color": "#8B5CF6", "sharePrice": 1782.8, "unitsSold": 185000, "totalRevenue": 2500000, "grossMargin": 0.370, "netIncome": -1200000, "marketShareUnits": 0.124, "marketShareUnitsPct": 12.4, "marketShareRevenue": 0.11, "rankBySharePrice": 6, "rankByUnitsSold": 6, "rankByGrossMargin": 5, "liquidityRatio": 20.0},
        {"period": 3, "year": 2028, "firmId": "realman", "firmName": "RealMan", "isOurFirm": False, "color": "#94A3B8", "sharePrice": 1458.2, "unitsSold": 66000, "totalRevenue": 890000, "grossMargin": 0.070, "netIncome": -5500000, "marketShareUnits": 0.044, "marketShareUnitsPct": 4.4, "marketShareRevenue": 0.04, "rankBySharePrice": 7, "rankByUnitsSold": 7, "rankByGrossMargin": 7, "liquidityRatio": 1.0},

        # --- 2029 (P4) Cierre Oficial de la Simulación ---
        {"period": 4, "year": 2029, "firmId": "stuart20", "firmName": "Stuart20", "isOurFirm": False, "color": "#3B82F6", "sharePrice": 3005.2, "unitsSold": 269527, "totalRevenue": 3720517, "grossMargin": 0.532, "netIncome": 501129, "marketShareUnits": 0.156, "marketShareUnitsPct": 15.6, "marketShareRevenue": 0.161, "rankBySharePrice": 1, "rankByUnitsSold": 3, "rankByGrossMargin": 1, "liquidityRatio": 124.6},
        {"period": 4, "year": 2029, "firmId": "roura1940", "firmName": "Roura1940", "isOurFirm": False, "color": "#10B981", "sharePrice": 2924.3, "unitsSold": 239536, "totalRevenue": 3170992, "grossMargin": 0.442, "netIncome": -61679, "marketShareUnits": 0.138, "marketShareUnitsPct": 13.8, "marketShareRevenue": 0.137, "rankBySharePrice": 2, "rankByUnitsSold": 5, "rankByGrossMargin": 3, "liquidityRatio": 58.9},
        {"period": 4, "year": 2029, "firmId": "spain10", "firmName": "Spain10", "isOurFirm": False, "color": "#8B5CF6", "sharePrice": 2248.7, "unitsSold": 178259, "totalRevenue": 2425038, "grossMargin": 0.386, "netIncome": -1527532, "marketShareUnits": 0.103, "marketShareUnitsPct": 10.3, "marketShareRevenue": 0.105, "rankBySharePrice": 3, "rankByUnitsSold": 6, "rankByGrossMargin": 5, "liquidityRatio": 19.0},
        {"period": 4, "year": 2029, "firmId": "fashionclub", "firmName": "FashionClub (FINNOVA)", "isOurFirm": True, "color": "#FB923C", "sharePrice": 2231.9, "unitsSold": 247270, "totalRevenue": 3561899, "grossMargin": 0.395, "netIncome": -3399251, "marketShareUnits": 0.143, "marketShareUnitsPct": 14.3, "marketShareRevenue": 0.154, "rankBySharePrice": 4, "rankByUnitsSold": 4, "rankByGrossMargin": 4, "liquidityRatio": 2.7},
        {"period": 4, "year": 2029, "firmId": "smartone", "firmName": "SmartOne", "isOurFirm": False, "color": "#06B6D4", "sharePrice": 2098.0, "unitsSold": 333869, "totalRevenue": 4529783, "grossMargin": 0.250, "netIncome": -2057712, "marketShareUnits": 0.193, "marketShareUnitsPct": 19.3, "marketShareRevenue": 0.196, "rankBySharePrice": 5, "rankByUnitsSold": 2, "rankByGrossMargin": 6, "liquidityRatio": 5.3},
        {"period": 4, "year": 2029, "firmId": "puntoone", "firmName": "PuntoOne", "isOurFirm": False, "color": "#EC4899", "sharePrice": 2084.4, "unitsSold": 397841, "totalRevenue": 4876781, "grossMargin": 0.466, "netIncome": -1367030, "marketShareUnits": 0.230, "marketShareUnitsPct": 23.0, "marketShareRevenue": 0.211, "rankBySharePrice": 6, "rankByUnitsSold": 1, "rankByGrossMargin": 2, "liquidityRatio": 15.6},
        {"period": 4, "year": 2029, "firmId": "realman", "firmName": "RealMan", "isOurFirm": False, "color": "#94A3B8", "sharePrice": 1428.3, "unitsSold": 64504, "totalRevenue": 877745, "grossMargin": 0.056, "netIncome": -7833759, "marketShareUnits": 0.037, "marketShareUnitsPct": 3.7, "marketShareRevenue": 0.038, "rankBySharePrice": 7, "rankByUnitsSold": 7, "rankByGrossMargin": 7, "liquidityRatio": 0.9}
    ]

    dataset = {
        "meta": {
            "teamName": "FINNOVA",
            "primaryFirmId": "fashionclub",
            "primaryFirmName": "FashionClub (FINNOVA)",
            "totalFirms": 7,
            "totalPeriods": 4,
            "generatedAt": "2026-11-06"
        },
        "periods": periods,
        "years": years,
        "firms": firms,
        "decisions": decisions,
        "decisionStories": decisionStories,
        "financials": financials,
        "operations": operations,
        "competitors": competitors,
        "valuationComponentsByYear": valuationComponentsByYear
    }

    out_path = "finnova-dashboard/data/processed/finnova_analytics.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(dataset, f, indent=2, ensure_ascii=False)
    print(f"SimulationDataset canónico generado en {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    build_dataset()
