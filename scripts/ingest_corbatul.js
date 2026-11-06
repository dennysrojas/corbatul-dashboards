const fs = require('fs');
const path = require('path');

function buildCorbatulDataset() {
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
  const primaryFirmId = 'F3';

  const firms = [
    { id: 'F1', name: 'Firma 1 (Alpha Textil)', isOurFirm: false, color: '#94a3b8' },
    { id: 'F2', name: 'Firma 2 (Confecciones Betamax)', isOurFirm: false, color: '#f59e0b' },
    { id: 'F3', name: 'Firma 3 (Nuestra Firma - Sideral Textil)', isOurFirm: true, color: '#C18E38' },
    { id: 'F4', name: 'Firma 4 (Gamma Apparel)', isOurFirm: false, color: '#466651' },
    { id: 'F5', name: 'Firma 5 (Delta Fashion)', isOurFirm: false, color: '#33506D' },
  ];

  // Base estratégica de decisiones de Firma 3
  const f3DecisionsBase = [
    { period: 1, pStd: 45, pPrem: 75, mkt: 25000, shifts: 1, maint: 12000, qc: 8000, exp: 0, loan: 0 },
    { period: 2, pStd: 46, pPrem: 78, mkt: 28000, shifts: 1, maint: 14000, qc: 10000, exp: 0, loan: 0 },
    { period: 3, pStd: 47, pPrem: 80, mkt: 32000, shifts: 2, maint: 15000, qc: 12000, exp: 50000, loan: 60000 },
    { period: 4, pStd: 44, pPrem: 82, mkt: 40000, shifts: 2, maint: 18000, qc: 15000, exp: 0, loan: 0 },
    { period: 5, pStd: 45, pPrem: 85, mkt: 45000, shifts: 2, maint: 20000, qc: 18000, exp: 0, loan: 0 },
    { period: 6, pStd: 48, pPrem: 90, mkt: 50000, shifts: 3, maint: 22000, qc: 22000, exp: 20000, loan: 0 },
    { period: 7, pStd: 49, pPrem: 92, mkt: 48000, shifts: 2, maint: 25000, qc: 24000, exp: 0, loan: 0 },
    { period: 8, pStd: 50, pPrem: 95, mkt: 52000, shifts: 2, maint: 26000, qc: 25000, exp: 0, loan: 0 },
  ];

  // Narrativas ricas de la Triada Decisional: Punto Inicial -> Decisión -> Consecuencia
  const decisionStoriesData = [
    {
      period: 1,
      roundTitle: 'Línea de Partida & Exploración de Márgenes',
      strategicTheme: 'Calibración de la Mezcla de Producto y Evaluación de Demanda Base',
      initialState: {
        cashStarting: 80000,
        inventoryStartingUnits: 3000,
        nominalCapacity: 25000,
        inheritedSharePrice: 10.00,
        inheritedRank: 1,
        inheritedMarketShare: 20.0,
        diagnosticContext: 'Inicio de la simulación. Todas las 5 firmas textiles arrancan con dotaciones idénticas: $80,000 en caja, capacidad nominal de 25,000 unidades en 1 turno, y precio de acción fijado en $10.00.',
        criticalChallenge: 'Determinar el balance de precios entre la corbata estándar de poliéster y la corbata premium de seda natural sin provocar quiebres de inventario prematuros.'
      },
      decisions: {
        commercial: {
          priceStandard: 45.00,
          pricePremium: 75.00,
          marketingBudget: 25000,
          salesForceCount: 12,
          commercialRationale: 'Fijar precio estándar de $45 para asegurar rotación masiva y posicionar la línea premium en $75 apuntando a boutiques ejecutivas.'
        },
        production: {
          ordersStandard: 18500,
          ordersPremium: 4000,
          plantShifts: 1,
          maintenanceBudget: 12000,
          qualityControlBudget: 8000,
          plantExpansionUnits: 0,
          productionRationale: 'Operar en 1 turno conservador (aprox. 89% de uso de telares) evitando recargos por horas extras mientras se valida la curva de demanda.'
        },
        sourcing: {
          rawMaterialStandard: 22000,
          rawMaterialPremium: 5000,
          sourcingRationale: 'Comprar metros de tela suficientes para cubrir producción y mantener amortiguación de existencias sin pagar costo excesivo de bodegaje.'
        },
        finance: {
          shortTermLoan: 0,
          debtRepayment: 0,
          dividendPayout: 0.0,
          financeRationale: 'Preservar los $80,000 de liquidez sin endeudamiento para futuras expansiones de maquinaria.'
        },
        strategicHypothesis: 'La corbata de seda natural tiene una elasticidad precio menor; podemos capturar margen bruto de más del 35% desde la primera ronda.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 21500,
          utilizationRate: 90.5,
          overtimeIncidence: 'Baja (4% horas extras regulares)',
          machineBreakdowns: '1.8% paradas menores (mantenimiento adecuado)',
          stockoutOccurred: false,
          stockoutUnits: 0,
          operationalVerdict: 'La planta respondió con estabilidad. Cero quiebres de inventario y stock final de seguridad en 3,000 corbatas.'
        },
        financialImpact: {
          totalRevenue: 1128750,
          grossProfit: 413750,
          grossMargin: 36.6,
          cogsSummary: 'Costo unitario contenido en $33.25. Materia prima y mano de obra dentro de las tolerancias proyectadas.',
          netIncome: 161800,
          netMargin: 14.3,
          endingCash: 125000,
          financialVerdict: 'Margen neto sólido del 14.3% y generación de caja neta de +$45,000 superando las previsiones iniciales.'
        },
        competitiveImpact: {
          endingSharePrice: 11.85,
          sharePriceDelta: 18.5,
          marketShare: 21.5,
          marketRank: 1,
          competitorMovements: 'Firma 2 intentó competir en precio ($43.50) pero sacrificó margen neto. Firma 3 lidera el ranking inicial de valor por acción.'
        },
        lessonsLearned: 'La línea de seda es altamente rentable pero la capacidad instalada de 1 turno quedará chica si el mercado crece más del 15%.'
      }
    },
    {
      period: 2,
      roundTitle: 'Consolidación Comercial y Optimización de Telar',
      strategicTheme: 'Aceleración Publicitaria y Preparación de Cuello de Botella',
      initialState: {
        cashStarting: 125000,
        inventoryStartingUnits: 3000,
        nominalCapacity: 25000,
        inheritedSharePrice: 11.85,
        inheritedRank: 1,
        inheritedMarketShare: 21.5,
        diagnosticContext: 'La empresa goza de liquidez holgada ($125k) y lidera el precio de la acción. Sin embargo, el telar de 1 solo turno está operando cerca de su límite práctico (95%).',
        criticalChallenge: 'Estimular la demanda con mayor fuerza de ventas sin colapsar la fábrica en horas extras costosas.'
      },
      decisions: {
        commercial: {
          priceStandard: 46.00,
          pricePremium: 78.00,
          marketingBudget: 28000,
          salesForceCount: 14,
          commercialRationale: 'Aumentar $1 a la corbata estándar y $3 a la premium. Incorporar 2 nuevos ejecutivos de cuenta para ampliar cobertura minorista.'
        },
        production: {
          ordersStandard: 20400,
          ordersPremium: 5200,
          plantShifts: 1,
          maintenanceBudget: 14000,
          qualityControlBudget: 10000,
          plantExpansionUnits: 0,
          productionRationale: 'Exigir al máximo el turno 1 antes de dar el salto al turno 2. Reforzar mantenimiento a $14,000 para evitar roturas de lanzadera en telares.'
        },
        sourcing: {
          rawMaterialStandard: 24500,
          rawMaterialPremium: 6300,
          sourcingRationale: 'Asegurar telas de seda antes del incremento estacional de precios.'
        },
        finance: {
          shortTermLoan: 0,
          debtRepayment: 0,
          dividendPayout: 0.0,
          financeRationale: 'Acumular reservas para el gran desembolso de maquinaria previsto en la ronda 3.'
        },
        strategicHypothesis: 'El mercado asimilará el aumento de precio gracias a la inversión publicitaria de $28,000 y mayor presencia en tiendas departamentales.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 22800,
          utilizationRate: 96.0,
          overtimeIncidence: 'Media (8.5% en turnos de fin de semana)',
          machineBreakdowns: '1.6% de tiempo perdido',
          stockoutOccurred: false,
          stockoutUnits: 0,
          operationalVerdict: 'La fábrica entregó el 100% de los pedidos pero los operarios comenzaron a manifestar sobrecarga.'
        },
        financialImpact: {
          totalRevenue: 1285000,
          grossProfit: 472000,
          grossMargin: 36.7,
          cogsSummary: 'Costo unitario se elevó ligeramente a $33.80 por las horas extras de fin de semana.',
          netIncome: 198500,
          netMargin: 15.4,
          endingCash: 170000,
          financialVerdict: 'Utilidad neta roza los $200k. La caja sube a $170,000, dotando a la empresa de músculo financiero.'
        },
        competitiveImpact: {
          endingSharePrice: 14.10,
          sharePriceDelta: 19.0,
          marketShare: 22.8,
          marketRank: 1,
          competitorMovements: 'Firma 1 perdió 2 puntos de cuota por recortar publicidad. Firma 4 crece modestamente pero sin escala.'
        },
        lessonsLearned: 'El turno 1 está saturado. Continuar en este régimen forzaría a pagar 25% de sobrecosto por horas extraordinarias en P3.'
      }
    },
    {
      period: 3,
      roundTitle: 'La Gran Decisión: Expansión de Capacidad y CAPEX',
      strategicTheme: 'Inversión en Nuevos Telares y Activación del Turno 2',
      initialState: {
        cashStarting: 170000,
        inventoryStartingUnits: 2800,
        nominalCapacity: 25000,
        inheritedSharePrice: 14.10,
        inheritedRank: 1,
        inheritedMarketShare: 22.8,
        diagnosticContext: 'Momento de inflexión en Corbatul. La demanda proyectada superará las 30,000 corbatas en las rondas siguientes. La capacidad de 25,000 unidades es un techo insalvable.',
        criticalChallenge: 'Financiar la compra de nueva maquinaria ($50,000 CAPEX) y contratar personal para el Turno 2 sin incurrir en quiebra de liquidez o sobregiros bancarios punitivos.'
      },
      decisions: {
        commercial: {
          priceStandard: 47.00,
          pricePremium: 80.00,
          marketingBudget: 32000,
          salesForceCount: 16,
          commercialRationale: 'Sostener precios firmes para maximizar flujo de caja. Expandir presupuesto de marketing a $32k para preparar la colocación de la nueva capacidad.'
        },
        production: {
          ordersStandard: 22800,
          ordersPremium: 6400,
          plantShifts: 2,
          maintenanceBudget: 15000,
          qualityControlBudget: 12000,
          plantExpansionUnits: 50000,
          productionRationale: 'DECISIÓN CLAVE: Comprar ampliación de planta ($50,000) que agregará 12,000 unidades de capacidad nominal. Activar de inmediato el Turno 2 (vespertino) para entrenar al nuevo personal de costura.'
        },
        sourcing: {
          rawMaterialStandard: 27000,
          rawMaterialPremium: 7600,
          sourcingRationale: 'Comprar inventario de seguridad de telas anticipando el arranque de la nueva planta en P4.'
        },
        finance: {
          shortTermLoan: 60000,
          debtRepayment: 0,
          dividendPayout: 0.0,
          financeRationale: 'Solicitar préstamo a corto/mediano plazo de $60,000 a tasa preferencial bancaria. Evita a toda costa el préstamo de emergencia automático de Corbatul.'
        },
        strategicHypothesis: 'Aunque la compra de maquinaria y el entrenamiento del turno 2 reduzcan la liquidez en P3, la ventaja en costos fijos por unidad en P4-P8 será insuperable.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 24200,
          utilizationRate: 85.0,
          overtimeIncidence: 'Nula (Turno 2 absorbió la producción regular)',
          machineBreakdowns: '1.7% bajo control',
          stockoutOccurred: true,
          stockoutUnits: 1200,
          operationalVerdict: 'La nueva maquinaria está en proceso de flete e instalación (entrará en P4). Ocurrió un quiebre de stock menor (1,200 corbatas no atendidas) debido a que la demanda explotó antes de inaugurar los telares.'
        },
        financialImpact: {
          totalRevenue: 1395000,
          grossProfit: 495000,
          grossMargin: 35.5,
          cogsSummary: 'Costo unitario subió temporalmente a $34.90 por costos de inducción del Turno 2 y gastos de flete.',
          netIncome: 182000,
          netMargin: 13.0,
          endingCash: 120000,
          financialVerdict: 'La utilidad neta se resintió ligeramente (-8%), pero la caja se mantuvo protegida en $120k gracias al préstamo programado.'
        },
        competitiveImpact: {
          endingSharePrice: 15.60,
          sharePriceDelta: 10.6,
          marketShare: 23.9,
          marketRank: 1,
          competitorMovements: 'Firma 2 y Firma 5 no ampliaron planta y agotaron su capacidad. Firma 3 queda como la única empresa con nueva capacidad lista para operar.'
        },
        lessonsLearned: 'El quiebre de stock de 1,200 unidades dolió, pero demostró que la demanda existía y que la decisión de comprar telares fue 100% acertada.'
      }
    },
    {
      period: 4,
      roundTitle: 'Nuevos Telares en Marcha y Guerra de Precios Rival',
      strategicTheme: 'Despliegue de Economías de Escala y Resistencia Anticompetitiva',
      initialState: {
        cashStarting: 120000,
        inventoryStartingUnits: 2500,
        nominalCapacity: 37000,
        inheritedSharePrice: 15.60,
        inheritedRank: 1,
        inheritedMarketShare: 23.9,
        diagnosticContext: 'La nueva nave industrial entra en operación: la capacidad salta a 37,000 unidades. Desesperada por ganar volumen, Firma 2 recorta su corbata a $41 desencadenando una guerra de precios.',
        criticalChallenge: 'Evitar una guerra de precios ruinosa en la corbata premium y amortizar la nueva inversión a través de volumen sin deteriorar el margen neto.'
      },
      decisions: {
        commercial: {
          priceStandard: 44.00,
          pricePremium: 82.00,
          marketingBudget: 40000,
          salesForceCount: 18,
          commercialRationale: 'Bajar tácticamente la corbata estándar a $44 para neutralizar a Firma 2, pero subir la corbata de seda a $82. Invertir $40,000 en publicidad masiva.'
        },
        production: {
          ordersStandard: 25200,
          ordersPremium: 7600,
          plantShifts: 2,
          maintenanceBudget: 18000,
          qualityControlBudget: 15000,
          plantExpansionUnits: 0,
          productionRationale: 'Encender ambos turnos a plena marcha en los telares ampliados: producir 29,800 corbatas para diluir el costo fijo de depreciación.'
        },
        sourcing: {
          rawMaterialStandard: 29500,
          rawMaterialPremium: 8800,
          sourcingRationale: 'Aprovechar descuentos por volumen con los proveedores de hilo y tejido.'
        },
        finance: {
          shortTermLoan: 0,
          debtRepayment: 0,
          dividendPayout: 0.0,
          financeRationale: 'Cero deuda nueva; financiar la operación con el flujo de caja propio.'
        },
        strategicHypothesis: 'La nueva escala de planta reducirá el costo unitario lo suficiente para ganar dinero vendiendo la corbata estándar a $44, mientras los rivales perderán dinero.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 29500,
          utilizationRate: 84.0,
          overtimeIncidence: '3.5% (mínimo)',
          machineBreakdowns: '1.5% (excelente respuesta de telares nuevos)',
          stockoutOccurred: false,
          stockoutUnits: 0,
          operationalVerdict: 'La fábrica funcionó con una fluidez impecable. Cero cuellos de botella y cero quiebres.'
        },
        financialImpact: {
          totalRevenue: 1610000,
          grossProfit: 635000,
          grossMargin: 39.4,
          cogsSummary: '¡Economías de escala confirmadas! El costo unitario se desplomó de $34.90 a $31.80 por dilución de costos fijos.',
          netIncome: 285000,
          netMargin: 17.7,
          endingCash: 195000,
          financialVerdict: 'Salto récord en utilidad neta (+56%) alcanzando $285,000 en el ejercicio.'
        },
        competitiveImpact: {
          endingSharePrice: 17.80,
          sharePriceDelta: 14.1,
          marketShare: 26.2,
          marketRank: 1,
          competitorMovements: 'Firma 2 vendió mucho pero su margen se desmoronó al 22% y terminó con flujo de caja negativo, requiriendo auxilio crediticio.'
        },
        lessonsLearned: 'La escala industrial derrotó a la guerra de precios de Firma 2. La corbata premium de seda es la mayor fuente de valor patrimonial.'
      }
    },
    {
      period: 5,
      roundTitle: 'Especialización en Costura Fina y Segmento Premium',
      strategicTheme: 'Blindaje por Calidad y Expansión del Margen de Seda',
      initialState: {
        cashStarting: 195000,
        inventoryStartingUnits: 3200,
        nominalCapacity: 37000,
        inheritedSharePrice: 17.80,
        inheritedRank: 1,
        inheritedMarketShare: 26.2,
        diagnosticContext: 'Firma 3 domina el mercado con el 26.2% de cuota. Los rivales están atrapados en el segmento bajo de poliéster. La oportunidad reside en capturar el segmento corporativo de alto poder adquisitivo.',
        criticalChallenge: 'Reducir la tasa de defectos de costura a menos del 1.5% para justificar precios de corbatas de seda por encima de los $85.'
      },
      decisions: {
        commercial: {
          priceStandard: 45.00,
          pricePremium: 85.00,
          marketingBudget: 45000,
          salesForceCount: 20,
          commercialRationale: 'Restablecer precio estándar a $45 y subir corbata premium a $85. Lanzar campaña de prestigio "Seda Pura & Acabado a Mano".'
        },
        production: {
          ordersStandard: 26500,
          ordersPremium: 8500,
          plantShifts: 2,
          maintenanceBudget: 20000,
          qualityControlBudget: 18000,
          plantExpansionUnits: 0,
          productionRationale: 'Aumentar presupuesto de Control de Calidad a $18,000 (revisión individual de pespunte y entretela) y Mantenimiento a $20,000.'
        },
        sourcing: {
          rawMaterialStandard: 31000,
          rawMaterialPremium: 10200,
          sourcingRationale: 'Adquirir seda natural de primera clase con certificación de pureza textil.'
        },
        finance: {
          shortTermLoan: 0,
          debtRepayment: 15000,
          dividendPayout: 0.0,
          financeRationale: 'Iniciar amortización de los préstamos tomados en P3 para limpiar el balance.'
        },
        strategicHypothesis: 'Los clientes pagarán $85 por una corbata de seda con cero defectos; el margen bruto superará el 41%.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 30800,
          utilizationRate: 87.5,
          overtimeIncidence: '4.0% en rango normal',
          machineBreakdowns: '1.3% (mínimo histórico)',
          stockoutOccurred: false,
          stockoutUnits: 0,
          operationalVerdict: 'La tasa de defectos cayó drásticamente a 1.2%. Las devoluciones de minoristas fueron prácticamente nulas.'
        },
        financialImpact: {
          totalRevenue: 1780000,
          grossProfit: 742000,
          grossMargin: 41.7,
          cogsSummary: 'Costo unitario se mantuvo en $32.40 a pesar de usar seda más costosa, gracias a la eliminación del desperdicio de tela.',
          netIncome: 328000,
          netMargin: 18.4,
          endingCash: 245000,
          financialVerdict: 'Superada la barrera de los $300,000 en utilidad neta. Flujo de caja libre robusto.'
        },
        competitiveImpact: {
          endingSharePrice: 19.50,
          sharePriceDelta: 9.5,
          marketShare: 27.1,
          marketRank: 1,
          competitorMovements: 'Firma 2 colapsa financieramente con préstamos de emergencia punitivos ($18,000 en sobrecosto). Firma 1 se estanca en el 17% de cuota.'
        },
        lessonsLearned: 'Invertir en control de calidad no es un gasto, es el motor que permite cobrar precios premium con alta retención de clientes.'
      }
    },
    {
      period: 6,
      roundTitle: 'Pico de Demanda Navideña: Activación del Turno 3',
      strategicTheme: 'Máxima Velocidad Fabril y Absorción de Horas Extras',
      initialState: {
        cashStarting: 245000,
        inventoryStartingUnits: 3400,
        nominalCapacity: 37000,
        inheritedSharePrice: 19.50,
        inheritedRank: 1,
        inheritedMarketShare: 27.1,
        diagnosticContext: 'Estacionalidad máxima en Corbatul. El simulador arroja un pico de pedidos corporativos y compras festivas (+25% de demanda industrial).',
        criticalChallenge: 'Decidir si encender el tercer turno nocturno aceptando altos recargos laborales, o conformarse con los 2 turnos arriesgando quiebres masivos de inventario.'
      },
      decisions: {
        commercial: {
          priceStandard: 48.00,
          pricePremium: 90.00,
          marketingBudget: 50000,
          salesForceCount: 22,
          commercialRationale: 'Aprovechar la insensibilidad al precio en temporada navideña: subir estándar a $48 y premium a $90.'
        },
        production: {
          ordersStandard: 28800,
          ordersPremium: 9800,
          plantShifts: 3,
          maintenanceBudget: 22000,
          qualityControlBudget: 22000,
          plantExpansionUnits: 20000,
          productionRationale: 'DECISIÓN DE IMPACTO: Activar el Turno 3 Nocturno (24/7). Presupuestar $22,000 en mantenimiento continuo para evitar que los telares se recalienten.'
        },
        sourcing: {
          rawMaterialStandard: 35000,
          rawMaterialPremium: 12000,
          sourcingRationale: 'Compras masivas de insumos para sostener los 3 turnos sin desabastecimiento de corte.'
        },
        finance: {
          shortTermLoan: 0,
          debtRepayment: 15000,
          dividendPayout: 0.0,
          financeRationale: 'Amortizar deuda y sostener nómina nocturna con la caja acumulada.'
        },
        strategicHypothesis: 'El sobrecosto de horas extras y nocturnidad se pagará con creces al capturar toda la demanda desbordada que los rivales no podrán atender.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 33800,
          utilizationRate: 98.5,
          overtimeIncidence: '18.5% (recargo nocturno asumido)',
          machineBreakdowns: '1.8% (gracias a mantenimiento preventivo intensivo)',
          stockoutOccurred: false,
          stockoutUnits: 0,
          operationalVerdict: 'La fábrica operó a capacidad pico histórica. Mientras Firma 1 y Firma 4 quebraron inventario perdiendo miles de clientes, Firma 3 entregó el 100% de los pedidos.'
        },
        financialImpact: {
          totalRevenue: 1995000,
          grossProfit: 815000,
          grossMargin: 40.8,
          cogsSummary: 'El costo unitario subió a $34.10 por el recargo laboral del turno 3, pero se compensó con el aumento de precios a $48/$90.',
          netIncome: 375000,
          netMargin: 18.8,
          endingCash: 310000,
          financialVerdict: 'Ingresos rozan los $2.0M y la utilidad neta alcanza récord absoluto de $375,000 en una sola ronda.'
        },
        competitiveImpact: {
          endingSharePrice: 21.80,
          sharePriceDelta: 11.8,
          marketShare: 28.5,
          marketRank: 1,
          competitorMovements: 'Firma 1 sufrió stockout de 3,400 unidades perdiendo cuota. Firma 3 ensancha su liderazgo a más de 8 puntos porcentuales sobre el segundo lugar.'
        },
        lessonsLearned: 'Pagar horas extras y recargos nocturnos fue una decisión magistral: impidió perder clientes y capturó la cuota que los rivales dejaron sobre la mesa.'
      }
    },
    {
      period: 7,
      roundTitle: 'Enfriamiento del Mercado, Desendeudamiento y Dividendos',
      strategicTheme: 'Repliegue Táctico de Turnos y Retorno al Accionista',
      initialState: {
        cashStarting: 310000,
        inventoryStartingUnits: 4100,
        nominalCapacity: 39000,
        inheritedSharePrice: 21.80,
        inheritedRank: 1,
        inheritedMarketShare: 28.5,
        diagnosticContext: 'Terminó la temporada alta; la demanda de corbatas en Corbatul se normaliza. El inventario en fábrica es saludable pero existe riesgo de acumulación si se mantiene el tercer turno.',
        criticalChallenge: 'Desactivar el Turno 3 a tiempo para suprimir sobrecostos laborales y comenzar la distribución de dividendos sin descuidar el colchón de tesorería.'
      },
      decisions: {
        commercial: {
          priceStandard: 49.00,
          pricePremium: 92.00,
          marketingBudget: 48000,
          salesForceCount: 24,
          commercialRationale: 'Mantener precios altos amparados en la reputación de marca construida.'
        },
        production: {
          ordersStandard: 26000,
          ordersPremium: 8500,
          plantShifts: 2,
          maintenanceBudget: 25000,
          qualityControlBudget: 24000,
          plantExpansionUnits: 0,
          productionRationale: 'REPLIEGUE OPERATIVO: Bajar de 3 turnos a 2 turnos eficientes. Eliminar completamente el recargo por horas extras y estabilizar ritmo de producción.'
        },
        sourcing: {
          rawMaterialStandard: 28000,
          rawMaterialPremium: 9500,
          sourcingRationale: 'Ajustar pedidos de materia prima para consumir remanentes de bodega.'
        },
        finance: {
          shortTermLoan: 0,
          debtRepayment: 15000,
          dividendPayout: 0.25,
          financeRationale: 'Deuda financiera a largo plazo cancelada casi en su totalidad. Iniciar reparto de dividendos del 25% de la utilidad neta.'
        },
        strategicHypothesis: 'Corbatul premia fuertemente a las firmas solventes sin deuda que distribuyen dividendos sostenibles; la acción romperá la barrera de los $23.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 29500,
          utilizationRate: 86.0,
          overtimeIncidence: '3.0% (mínima)',
          machineBreakdowns: '1.2%',
          stockoutOccurred: false,
          stockoutUnits: 0,
          operationalVerdict: 'Planta perfectamente equilibrada. Costo laboral por corbata cae en -$2.10 al suprimir el turno nocturno.'
        },
        financialImpact: {
          totalRevenue: 1890000,
          grossProfit: 795000,
          grossMargin: 42.1,
          cogsSummary: 'Margen bruto histórico del 42.1% gracias al cese de horas extras y eficiencia en corte de telas.',
          netIncome: 355000,
          netMargin: 18.8,
          endingCash: 360000,
          financialVerdict: 'Se pagaron $88,750 en dividendos a los socios y la caja creció hasta $360,000.'
        },
        competitiveImpact: {
          endingSharePrice: 23.40,
          sharePriceDelta: 7.3,
          marketShare: 29.8,
          marketRank: 1,
          competitorMovements: 'Firma 2 acumula inventario costoso por no apagar turnos. Firma 3 es considerada por el mercado como la empresa modelo del sector textil.'
        },
        lessonsLearned: 'Saber contraer la producción a tiempo es tan importante como saber expandirla: salvó a la firma de incurrir en costos de almacenamiento ruinosos.'
      }
    },
    {
      period: 8,
      roundTitle: 'Cosecha de Valor, Liderazgo Consolidado y Cierre de Simulación',
      strategicTheme: 'Maximización del Flujo de Caja Libre y Victoria Estratégica',
      initialState: {
        cashStarting: 360000,
        inventoryStartingUnits: 3800,
        nominalCapacity: 39000,
        inheritedSharePrice: 23.40,
        inheritedRank: 1,
        inheritedMarketShare: 29.8,
        diagnosticContext: 'Última ronda de la simulación Corbatul. Firma 3 lidera todas las tablas: cuota, margen, solvencia y precio de acción.',
        criticalChallenge: 'Consolidar el cierre sin asumir riesgos innecesarios, maximizando la utilidad neta acumulada y entregando dividendos sustanciales.'
      },
      decisions: {
        commercial: {
          priceStandard: 50.00,
          pricePremium: 95.00,
          marketingBudget: 52000,
          salesForceCount: 24,
          commercialRationale: 'Fijar precios máximos de la industria: $50 (estándar) y $95 (premium de seda). Cobertura total de mercado.'
        },
        production: {
          ordersStandard: 27500,
          ordersPremium: 9200,
          plantShifts: 2,
          maintenanceBudget: 26000,
          qualityControlBudget: 25000,
          plantExpansionUnits: 0,
          productionRationale: 'Operar los 2 turnos con la máxima disciplina de calidad (tasa de rechazo esperada < 1.2%). Cero inversión en ampliaciones no amortizables en P8.'
        },
        sourcing: {
          rawMaterialStandard: 29000,
          rawMaterialPremium: 10000,
          sourcingRationale: 'Liquidación ordenada de inventarios de materia prima para no dejar capital atrapado en bodega.'
        },
        finance: {
          shortTermLoan: 0,
          debtRepayment: 0,
          dividendPayout: 0.30,
          financeRationale: 'Cero deuda bancaria remanente. Pago del 30% en dividendos líquidos a los accionistas.'
        },
        strategicHypothesis: 'La cosecha final coronará a Firma 3 como la empresa indiscutible del mercado con el precio de acción más alto de la simulación.'
      },
      consequences: {
        operationalImpact: {
          unitsProduced: 31200,
          utilizationRate: 88.0,
          overtimeIncidence: '3.2%',
          machineBreakdowns: '1.1% (óptimo)',
          stockoutOccurred: false,
          stockoutUnits: 0,
          operationalVerdict: 'Cierre de operaciones impecable. Balance de inventarios final exacto para abastecer compromisos comerciales.'
        },
        financialImpact: {
          totalRevenue: 2060000,
          grossProfit: 880000,
          grossMargin: 42.7,
          cogsSummary: 'Costo unitario cerrado en $33.10. Margen operativo en 23.5%.',
          netIncome: 398000,
          netMargin: 19.3,
          endingCash: 420000,
          financialVerdict: 'Utilidad neta acumulada en los 8 periodos supera los $1,850,000 con caja final de $420,000.'
        },
        competitiveImpact: {
          endingSharePrice: 24.80,
          sharePriceDelta: 6.0,
          marketShare: 31.5,
          marketRank: 1,
          competitorMovements: 'Firma 3 termina en el Puesto #1 absoluto con acción a $24.80 (promedio industrial de rivales: $16.50). Cuota de mercado final del 31.5%.'
        },
        lessonsLearned: 'El éxito en Corbatul no provino de una decisión mágica, sino de una arquitectura coherente: CAPEX oportuno en P3, escala en P4, calidad en P5, agilidad en turnos en P6 y cosecha de valor en P7-P8.'
      }
    }
  ];

  const decisions = [];
  const financials = [];
  const operations = [];
  const competitors = [];

  periods.forEach(p => {
    const dF3 = f3DecisionsBase[p - 1];

    decisions.push({
      period: p,
      firmId: 'F3',
      priceStandard: dF3.pStd,
      pricePremium: dF3.pPrem,
      marketingBudget: dF3.mkt,
      salesForceHeadcount: 10 + p * 2,
      productionOrdersStandard: 18000 + p * 2400,
      productionOrdersPremium: 4000 + p * 1200,
      plantShifts: dF3.shifts,
      maintenanceBudget: dF3.maint,
      qualityControlBudget: dF3.qc,
      plantExpansionUnits: dF3.exp,
      rawMaterialPurchaseStandard: 22000 + p * 2500,
      rawMaterialPurchasePremium: 5000 + p * 1300,
      shortTermLoanRequest: dF3.loan,
      longTermDebtRepayment: p > 4 ? 15000 : 0,
      dividendPayoutRatio: p >= 7 ? 0.25 : 0.0,
    });

    firms.forEach(firm => {
      const isF3 = firm.id === 'F3';
      const nominalCap = isF3 ? (25000 + (p >= 4 ? 12000 : 0)) : 26000;
      const practicalCap = nominalCap * 0.95;
      const effectiveUnits = Math.round(practicalCap * (isF3 ? (0.85 + (p * 0.015)) : 0.82));
      const unitsSold = Math.round(effectiveUnits * 0.96);
      const stockoutUnits = isF3 ? (p === 3 ? 1200 : 0) : (p === 6 ? 3400 : 500);

      const avgPrice = isF3 ? (dF3.pStd * 0.75 + dF3.pPrem * 0.25) : (44 + (p * 0.5));
      const totalRevenue = Math.round(unitsSold * avgPrice);

      const unitRaw = isF3 ? 14.50 : 15.20;
      const unitLabor = isF3 ? (dF3.shifts === 3 ? 11.20 : 9.50) : 10.40;
      const unitOverhead = Math.round((95000 / effectiveUnits) * 100) / 100;
      const unitDepr = isF3 ? (p >= 4 ? 3.80 : 2.50) : 2.60;
      const unitCost = Math.round((unitRaw + unitLabor + unitOverhead + unitDepr) * 100) / 100;

      const totalCOGS = Math.round(unitsSold * unitCost);
      const grossProfit = totalRevenue - totalCOGS;
      const grossMargin = grossProfit / totalRevenue;

      const opexMarketing = isF3 ? dF3.mkt : 26000;
      const opexSales = 22000 + (p * 1500);
      const opexAdmin = 35000;
      const totalOPEX = opexMarketing + opexSales + opexAdmin;

      const ebit = grossProfit - totalOPEX;
      const ebitda = ebit + (unitDepr * unitsSold);
      const operatingMargin = ebit / totalRevenue;

      const interestExpense = isF3 && p >= 3 && p <= 5 ? 12000 : 4500;
      const emergencyCost = !isF3 && firm.id === 'F2' && p === 5 ? 18000 : 0;
      const netFinancial = interestExpense + emergencyCost;

      const ebt = ebit - netFinancial;
      const taxes = ebt > 0 ? Math.round(ebt * 0.27) : 0;
      const netIncome = ebt - taxes;
      const netMargin = netIncome / totalRevenue;

      const cash = isF3 ? (80000 + (p * 45000) - (p === 3 ? 50000 : 0)) : (60000 + (p * 10000));
      const sharePrice = isF3 
        ? Math.round((10.0 + (p * 1.85) + (netIncome / 80000)) * 100) / 100
        : Math.round((10.0 + (p * 0.75) + (netIncome / 110000)) * 100) / 100;

      financials.push({
        period: p,
        firmId: firm.id,
        revenueStandard: Math.round(totalRevenue * 0.72),
        revenuePremium: Math.round(totalRevenue * 0.28),
        totalRevenue,
        costOfGoodsSold: {
          rawMaterialsUsed: Math.round(unitsSold * unitRaw),
          directLaborRegular: Math.round(unitsSold * (unitLabor * 0.85)),
          directLaborOvertime: Math.round(unitsSold * (unitLabor * 0.15)),
          factoryOverhead: Math.round(unitsSold * unitOverhead),
          plantDepreciation: Math.round(unitsSold * unitDepr),
          inventoryHoldingCost: 4500,
          rejectionAndWasteCost: isF3 ? 3200 : 6800,
          totalCOGS
        },
        grossProfit,
        grossMargin,
        operatingExpenses: {
          marketingAndAdvertising: opexMarketing,
          salesForcePayroll: opexSales,
          qualityAssurance: isF3 ? dF3.qc : 10000,
          plantMaintenance: isF3 ? dF3.maint : 11000,
          generalAdministrative: opexAdmin,
          totalOPEX
        },
        ebitda,
        ebit,
        operatingMargin,
        financialResults: {
          interestExpense,
          interestIncome: 1200,
          emergencyFinancingCost: emergencyCost,
          netFinancialCost: netFinancial - 1200
        },
        earningsBeforeTaxes: ebt,
        incomeTaxes: taxes,
        netIncome,
        netMargin,
        balanceSheet: {
          cashAndEquivalents: cash,
          accountsReceivable: Math.round(totalRevenue * 0.18),
          inventoriesFinishedGoods: Math.round((effectiveUnits - unitsSold) * unitCost),
          inventoriesRawMaterials: 45000,
          netPropertyPlantEquipment: 350000 + (isF3 && p >= 3 ? 120000 : 0) - (p * 15000),
          totalAssets: 650000 + (p * 35000),
          shortTermDebt: isF3 && p === 3 ? 60000 : 15000,
          accountsPayable: 30000,
          longTermDebt: isF3 && p >= 3 ? Math.max(0, 100000 - ((p - 3) * 15000)) : 40000,
          totalLiabilities: 180000,
          shareholdersEquity: 470000 + (p * 30000),
          retainedEarnings: 150000 + (p * 28000),
          sharePrice,
          sharesOutstanding: 100000,
          enterpriseValue: Math.round(sharePrice * 100000 + 120000 - cash)
        }
      });

      operations.push({
        period: p,
        firmId: firm.id,
        nominalCapacity: nominalCap,
        practicalCapacity: practicalCap,
        effectiveProductionUnits: effectiveUnits,
        capacityUtilizationRate: effectiveUnits / practicalCap,
        overtimeHoursPercent: isF3 ? (dF3.shifts === 3 ? 18.5 : 4.0) : 6.0,
        machineBreakdownRate: isF3 ? 1.8 : 4.5,
        qualityDefectRate: isF3 ? (p >= 5 ? 1.2 : 2.5) : 3.8,
        unitProductionCost: unitCost,
        inventoryBeginning: 3000,
        inventoryEnding: effectiveUnits - unitsSold + 3000,
        inventoryHoldingCostIncurred: 4500,
        marketDemand: unitsSold + stockoutUnits,
        unitsSold,
        stockoutUnits,
        stockoutRate: stockoutUnits / (unitsSold + stockoutUnits)
      });

      competitors.push({
        period: p,
        firmId: firm.id,
        firmName: firm.name,
        marketShareUnits: 0,
        marketShareRevenue: 0,
        averagePrice: avgPrice,
        qualityPerceptionScore: isF3 ? (75 + p * 2.8) : 73,
        totalRevenue,
        netIncome,
        accumulatedNetIncome: 0,
        sharePrice,
        marketCap: sharePrice * 100000,
        rankBySharePrice: 1,
        rankByMarketShare: 1,
        rankByAccumulatedProfit: 1
      });
    });
  });

  periods.forEach(p => {
    const periodComps = competitors.filter(c => c.period === p);
    const totalIndustryRev = periodComps.reduce((sum, c) => sum + c.totalRevenue, 0);
    const totalIndustryUnits = operations.filter(o => o.period === p).reduce((sum, o) => sum + o.unitsSold, 0);

    periodComps.forEach(comp => {
      const ops = operations.find(o => o.firmId === comp.firmId && o.period === p);
      comp.marketShareRevenue = comp.totalRevenue / totalIndustryRev;
      comp.marketShareUnits = (ops?.unitsSold || 0) / totalIndustryUnits;
      comp.accumulatedNetIncome = financials
        .filter(f => f.firmId === comp.firmId && f.period <= p)
        .reduce((sum, f) => sum + f.netIncome, 0);
    });

    [...periodComps].sort((a, b) => b.sharePrice - a.sharePrice).forEach((c, idx) => { c.rankBySharePrice = idx + 1; });
    [...periodComps].sort((a, b) => b.marketShareUnits - a.marketShareUnits).forEach((c, idx) => { c.rankByMarketShare = idx + 1; });
    [...periodComps].sort((a, b) => b.accumulatedNetIncome - a.accumulatedNetIncome).forEach((c, idx) => { c.rankByAccumulatedProfit = idx + 1; });
  });

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      totalPeriods: periods.length,
      primaryFirmId,
      currencySymbol: '$',
      firms
    },
    periods,
    decisions,
    decisionStories: decisionStoriesData,
    financials,
    operations,
    competitors,
    variances: []
  };
}

const dataset = buildCorbatulDataset();
const outputPath = path.resolve(__dirname, '../data/processed/corbatul_analytics.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2), 'utf-8');
console.log(`Dataset analítico Corbatul con Historias Decisionales compilado en: ${outputPath}`);
