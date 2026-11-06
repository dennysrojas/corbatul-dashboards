# Corbatul & Co. — Plataforma Analítica Ejecutiva y Soporte a la Decisión

Plataforma ejecutiva construida con arquitectura **100% local-first** (Next.js 14, TypeScript, Tailwind CSS) bajo la metodología **Spec-Driven Development (SDD)** para la defensa y auditoría de resultados de la simulación de negocios **Corbatul** ante una Junta Directiva o Comité Evaluador.

Consulte el contrato formal de especificación en [docs/SDD_SPECIFICATION_CONTRACT.md](./docs/SDD_SPECIFICATION_CONTRACT.md).

---

## Características Principales

1. **Motor Causal de Simulación (3 Estados):**
   - **Diagnóstico Inicial:** Presenta el punto de partida heredado (Caja, Stock en Bodega, Capacidad de Telares, Cotización bursátil y Posición de la industria), contexto y reto crítico.
   - **Animación Cinemática:** Ejecución secuencial (~1.5s) que simula el procesamiento de los algoritmos de Corbatul.
   - **Pantalla Dividida 50% / 50%:** Muestra las Decisiones de los 4 ejes a la izquierda frente a los Resultados operativos, financieros y competitivos a la derecha.
   - **Modo Matriz Tabular:** Comparativa transversal de los 8 periodos simulados.
2. **Polaridad Contable en P&L:**
   - Variaciones en ingresos y utilidades con incremento positivo son favorables (verde `tweed`).
   - Variaciones en costos y gastos con incremento son desfavorables (rojo `rust`).
   - Cifras formateadas con `tabular-nums font-mono`.
3. **Benchmarking Visual:**
   - Gráficos comparativos de barras horizontales (Share Price y Market Share) destacando a la **Firma 3 (Sideral Textil)** frente a las Firmas 1, 2, 4 y 5.
4. **UI/UX Sartorial Vintage:**
   - Paleta cromática inspirada en sastrería clásica (`vintage-950`, `brass`, `tweed`, `denim`, `rust`) con alto contraste para proyección en sala de juntas.
   - Sidebar colapsable (`w-20` vs `w-72`) y diseño a ancho completo (100% viewport width).

---

## Puesta en Marcha Local

```bash
# 1. Instalar dependencias
npm install

# 2. Ingesta local de datos analíticos
npm run ingest

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Verificación de Integridad

```bash
# Verificación de tipos TypeScript
npx tsc --noEmit

# Compilación de producción
npm run build
```
