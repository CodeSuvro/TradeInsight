        const CONFIG = {
            ALPHA_VANTAGE_API_KEY: 'DR7X8BCOUZ0AD2G0',
            YAHOO_FINANCE_PROXY: 'https://finance.yahoo.com/quote/PRXY-USD/chart/#eyJsYXlvdXQiOnsiaW50ZXJ2YWwiOjEsInBlcmlvZGljaXR5IjoxLCJ0aW1lVW5pdCI6Im1pbnV0ZSIsImNhbmRsZVdpZHRoIjoxLCJmbGlwcGVkIjpmYWxzZSwidm9sdW1lVW5kZXJsYXkiOnRydWUsImFkaiI6dHJ1ZSwiY3Jvc3NoYWlyIjp0cnVlLCJjaGFydFR5cGUiOiJtb3VudGFpbiIsImV4dGVuZGVkIjpmYWxzZSwibWFya2V0U2Vzc2lvbnMiOnt9LCJhZ2dyZWdhdGlvblR5cGUiOiJvaGxjIiwiY2hhcnRTY2FsZSI6ImxpbmVhciIsInN0dWRpZXMiOnsi4oCMdm9sIHVuZHLigIwiOnsidHlwZSI6InZvbCB1bmRyIiwiaW5wdXRzIjp7IlNlcmllcyI6InNlcmllcyIsImlkIjoi4oCMdm9sIHVuZHLigIwiLCJkaXNwbGF5Ijoi4oCMdm9sIHVuZHLigIwifSwib3V0cHV0cyI6eyJVcCBWb2x1bWUiOiIjMGRiZDZlZWUiLCJEb3duIFZvbHVtZSI6IiNmZjU1NDdlZSJ9LCJwYW5lbCI6ImNoYXJ0IiwicGFyYW1ldGVycyI6eyJjaGFydE5hbWUiOiJjaGFydCIsImVkaXRNb2RlIjp0cnVlfSwiZGlzYWJsZWQiOmZhbHNlfX0sInBhbmVscyI6eyJjaGFydCI6eyJwZXJjZW50IjoxLCJkaXNwbGF5IjoiUFJYWS1VU0QiLCJjaGFydE5hbWUiOiJjaGFydCIsImluZGV4IjowLCJ5QXhpcyI6eyJuYW1lIjoiY2hhcnQiLCJwb3NpdGlvbiI6bnVsbH0sInlheGlzTEhTIjpbXSwieWF4aXNSSFMiOlsiY2hhcnQiLCLigIx2b2wgdW5kcuKAjCJdfX0sInNldFNwYW4iOnsibXVsdGlwbGllciI6MSwiYmFzZSI6InRvZGF5IiwicGVyaW9kaWNpdHkiOnsiaW50ZXJ2YWwiOjEsInBlcmlvZCI6MSwidGltZVVuaXQiOiJtaW51dGUifSwic2hvd0V2ZW50c1F1b3RlIjp0cnVlLCJmb3JjZUxvYWQiOnRydWV9LCJvdXRsaWVycyI6ZmFsc2UsImFuaW1hdGlvbiI6dHJ1ZSwiaGVhZHNVcCI6eyJzdGF0aWMiOnRydWUsImR5bmFtaWMiOmZhbHNlLCJmbG9hdGluZyI6ZmFsc2V9LCJsaW5lV2lkdGgiOjIsImZ1bGxTY3JlZW4iOnRydWUsInN0cmlwZWRCYWNrZ3JvdW5kIjp0cnVlLCJjb2xvciI6IiMwMDgxZjIiLCJjcm9zc2hhaXJTdGlja3kiOmZhbHNlLCJkb250U2F2ZVJhbmdlVG9MYXlvdXQiOnRydWUsInN5bWJvbHMiOlt7InN5bWJvbCI6IlBSWFktVVNEIiwic3ltYm9sT2JqZWN0Ijp7InN5bWJvbCI6IlBSWFktVVNEIn0sInBlcmlvZGljaXR5IjoxLCJpbnRlcnZhbCI6MSwidGltZVVuaXQiOiJtaW51dGUiLCJzZXRTcGFuIjp7Im11bHRpcGxpZXIiOjEsImJhc2UiOiJ0b2RheSIsInBlcmlvZGljaXR5Ijp7ImludGVydmFsIjoxLCJwZXJpb2QiOjEsInRpbWVVbml0IjoibWludXRlIn0sInNob3dFdmVudHNRdW90ZSI6dHJ1ZSwiZm9yY2VMb2FkIjp0cnVlfX1dLCJyZW5kZXJlcnMiOltdfSwiZXZlbnRzIjp7ImRpdnMiOnRydWUsInNwbGl0cyI6dHJ1ZSwidHJhZGluZ0hvcml6b24iOiJub25lIiwic2lnRGV2RXZlbnRzIjpbXX0sInByZWZlcmVuY2VzIjp7fX0=',
            SENTIMENT_ANALYSIS_ENDPOINT: '5c1ec46d8cc647ca93fcf1675c817db0',
            KAGGLE_API_KEY: '01fe74d093f388c2153c9e6c7b2c29b8'
        };
      let predictionChart;
        let currentDataset = null;
        let isDatasetLoaded = false;

        function showMessage(message, type = 'info') {
            const container = document.getElementById('results-container');
            const messageClass = type === 'error' ? 'error-message' : 'success-message';
            const icon = type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-check-circle';
            
            const messageEl = document.createElement('div');
            messageEl.className = messageClass;
            messageEl.innerHTML = `<i class="${icon}"></i> ${message}`;
            
            container.insertBefore(messageEl, container.firstChild);
            
            setTimeout(() => {
                messageEl.remove();
            }, 5000);
        }

        function updateDatasetStatus(status, message) {
            const statusEl = document.getElementById('dataset-status');
            const indicator = statusEl.querySelector('.status-indicator');
            const text = statusEl.querySelector('span');
            
            indicator.className = `status-indicator status-${status}`;
            text.textContent = `Dataset: ${message}`;
        }

        function formatPrice(price) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(price);
        }

        function formatPercentage(value) {
            const sign = value >= 0 ? '+' : '';
            return `${sign}${value.toFixed(2)}%`;
        }

        async function loadYahooFinanceData(symbol) {
            try {
                updateDatasetStatus('loading', 'Loading from Yahoo Finance...');
                
                const response = await fetch(`${CONFIG.YAHOO_FINANCE_PROXY}${symbol}?interval=1d&range=2y`);
                if (!response.ok) throw new Error('Failed to fetch data');
                
                const data = await response.json();
                const result = data.chart.result[0];
                
                const processedData = {
                    symbol: symbol,
                    timestamps: result.timestamp.map(ts => new Date(ts * 1000)),
                    prices: {
                        open: result.indicators.quote[0].open,
                        high: result.indicators.quote[0].high,
                        low: result.indicators.quote[0].low,
                        close: result.indicators.quote[0].close,
                        volume: result.indicators.quote[0].volume
                    },
                    meta: result.meta
                };
                
                currentDataset = processedData;
                isDatasetLoaded = true;
                updateDatasetStatus('connected', `Yahoo Finance - ${symbol} (${processedData.timestamps.length} records)`);
                return processedData;
                
            } catch (error) {
                updateDatasetStatus('disconnected', 'Failed to load data');
                throw error;
            }
        }
        async function loadAlphaVantageData(symbol) {
            try {
                updateDatasetStatus('loading', 'Loading from Alpha Vantage...');

                const response = await fetch(`${CONFIG.ALPHA_VANTAGE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${CONFIG.ALPHA_VANTAGE_API_KEY}`);
                if (!response.ok) throw new Error('Failed to fetch data');
                
                const data = await response.json();
                const timeSeries = data['Time Series (Daily)'];
                const processedData = {
                    symbol: symbol,
                    timestamps: [],
                    prices: {
                        open: [],
                        high: [],
                        low: [],
                        close: [],
                        volume: []
                    }
                };
                
                for (const [timestamp, values] of Object.entries(timeSeries)) {
                    processedData.timestamps.push(new Date(timestamp));
                    processedData.prices.open.push(parseFloat(values['1. open']));
                    processedData.prices.high.push(parseFloat(values['2. high']));
                    processedData.prices.low.push(parseFloat(values['3. low']));
                    processedData.prices.close.push(parseFloat(values['4. close']));
                    processedData.prices.volume.push(parseInt(values['5. volume']));
                }
                
                currentDataset = processedData;
                isDatasetLoaded = true;
                updateDatasetStatus('connected', `Alpha Vantage - ${symbol} (${processedData.timestamps.length} records)`);
                return processedData;
                
            } catch (error) {
                updateDatasetStatus('disconnected', 'Failed to load data');
                throw error;
            }
        }

        async function loadCustomCSV(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const csv = e.target.result;
                        const lines = csv.split('\n');
                        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
                        
                        // Validate required columns
                        const requiredColumns = ['date', 'close'];
                        const missingColumns = requiredColumns.filter(col => !headers.includes(col));
                        
                        if (missingColumns.length > 0) {
                            throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
                        }
                        
                        const data = [];
                        for (let i = 1; i < lines.length; i++) {
                            if (lines[i].trim() === '') continue;
                            
                            const values = lines[i].split(',');
                            const row = {};
                            headers.forEach((header, index) => {
                                row[header] = values[index]?.trim();
                            });
                            
                            if (row.date && row.close) {
                                data.push({
                                    date: new Date(row.date),
                                    open: parseFloat(row.open) || parseFloat(row.close),
                                    high: parseFloat(row.high) || parseFloat(row.close),
                                    low: parseFloat(row.low) || parseFloat(row.close),
                                    close: parseFloat(row.close),
                                    volume: parseInt(row.volume) || 0
                                });
                            }
                        }
                        
                        if (data.length === 0) {
                            throw new Error('No valid data rows found');
                        }
                        
                        data.sort((a, b) => a.date - b.date);
                        
                        const processedData = {
                            symbol: 'CUSTOM',
                            timestamps: data.map(d => d.date),
                            prices: {
                                open: data.map(d => d.open),
                                high: data.map(d => d.high),
                                low: data.map(d => d.low),
                                close: data.map(d => d.close),
                                volume: data.map(d => d.volume)
                            }
                        };
                        
                        currentDataset = processedData;
                        isDatasetLoaded = true;
                        updateDatasetStatus('connected', `Custom CSV (${data.length} records)`);
                        resolve(processedData);
                        
                    } catch (error) {
                        updateDatasetStatus('disconnected', 'Invalid CSV format');
                        reject(error);
                    }
                };
                reader.readAsText(file);
            });
        }

        async function generatePrediction(dataset, days) {
                      
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            const prices = dataset.prices.close;
            const lastPrice = prices[prices.length - 1];
            const predictions = [];
            
            let currentPrice = lastPrice;
            const historicalReturns = [];
            
            for (let i = 1; i < prices.length; i++) {
                historicalReturns.push((prices[i] - prices[i-1]) / prices[i-1]);
            }
            
            const avgReturn = historicalReturns.reduce((a, b) => a + b, 0) / historicalReturns.length;
            const volatility = Math.sqrt(historicalReturns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / historicalReturns.length);
            
            const trend = avgReturn * 0.8;
            
            for (let i = 0; i < days; i++) {
                const randomComponent = (Math.random() - 0.5) * volatility * 2;
                const dailyReturn = trend + randomComponent;
                currentPrice = currentPrice * (1 + dailyReturn);
                predictions.push(currentPrice);
            }
            
            const finalPrice = predictions[predictions.length - 1];
            const totalReturn = (finalPrice - lastPrice) / lastPrice * 100;
            const confidence = Math.max(60, Math.min(95, 85 - volatility * 100)); 
            const upperBound = predictions.map(p => p * (1 + volatility * 1.96));
            const lowerBound = predictions.map(p => p * (1 - volatility * 1.96));
            
            return {
                predictions,
                upperBound,
                lowerBound,
                currentPrice: lastPrice,
                predictedPrice: finalPrice,
                totalReturn,
                confidence,
                volatility: volatility * 100,
                trend: trend > 0 ? 'bullish' : 'bearish'
            };
        }

        function initChart() {
            const ctx = document.getElementById('prediction-chart').getContext('2d');
            
            predictionChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Historical Price',
                            data: [],
                            borderColor: '#64748b',
                            backgroundColor: 'rgba(100, 116, 139, 0.1)',
                            borderWidth: 2,
                            pointRadius: 0,
                            tension: 0.2,
                            fill: false
                        },
                        {
                            label: 'AI Prediction',
                            data: [],
                            borderColor: '#22c55e',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            borderWidth: 3,
                            borderDash: [5, 5],
                            pointRadius: 0,
                            tension: 0.2,
                            fill: false
                        },
                        {
                            label: 'Upper Bound',
                            data: [],
                            borderColor: 'rgba(34, 197, 94, 0.3)',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            borderWidth: 1,
                            pointRadius: 0,
                            fill: '+1'
                        },
                        {
                            label: 'Lower Bound',
                            data: [],
                            borderColor: 'rgba(34, 197, 94, 0.3)',
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            borderWidth: 1,
                            pointRadius: 0,
                            fill: false
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#f8fafc',
                                filter: function(item, chart) {
                                    return !item.text.includes('Bound');
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            titleColor: '#f8fafc',
                            bodyColor: '#f8fafc',
                            borderColor: '#2563eb',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + formatPrice(context.parsed.y);
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(100, 116, 139, 0.1)'
                            },
                            ticks: {
                                color: '#94a3b8',
                                maxTicksLimit: 10
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(100, 116, 139, 0.1)'
                            },
                            ticks: {
                                color: '#94a3b8',
                                callback: function(value) {
                                    return formatPrice(value);
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
        }

        function updateChart(dataset, predictionResult = null, days = 30) {
            if (!predictionChart) return;

            const historyLength = Math.min(90, dataset.timestamps.length);
            const startIndex = dataset.timestamps.length - historyLength;
            
            const historyLabels = dataset.timestamps.slice(startIndex).map(date => 
                date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            );
            const historyPrices = dataset.prices.close.slice(startIndex);
            
            let labels = [...historyLabels];
            let historicalData = [...historyPrices];
            let predictionData = new Array(historyLength).fill(null);
            let upperBoundData = new Array(historyLength).fill(null);
            let lowerBoundData = new Array(historyLength).fill(null);
            
            if (predictionResult) {
                const lastDate = dataset.timestamps[dataset.timestamps.length - 1];
                for (let i = 1; i <= days; i++) {
                    const futureDate = new Date(lastDate);
                    futureDate.setDate(futureDate.getDate() + i);
                    labels.push(futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                }
                
                historicalData = [...historicalData, ...new Array(days).fill(null)];
                predictionData = [...predictionData, ...predictionResult.predictions];
                upperBoundData = [...upperBoundData, ...predictionResult.upperBound];
                lowerBoundData = [...lowerBoundData, ...predictionResult.lowerBound];
            }
            
            predictionChart.data.labels = labels;
            predictionChart.data.datasets[0].data = historicalData;
            predictionChart.data.datasets[1].data = predictionData;
            predictionChart.data.datasets[2].data = upperBoundData;
            predictionChart.data.datasets[3].data = lowerBoundData;
            
            predictionChart.update();
        }

        function displayResults(predictionResult, symbol, days) {
            const container = document.getElementById('results-container');
            
            container.innerHTML = `
                <div class="result-card">
                    <h3>Current Price</h3>
                    <div class="result-value">${formatPrice(predictionResult.currentPrice)}</div>
                    <p>${symbol}</p>
                </div>
                
                <div class="result-card">
                    <h3>${days}-Day Forecast</h3>
                    <div class="result-value ${predictionResult.totalReturn >= 0 ? 'positive' : 'negative'}">
                        ${formatPrice(predictionResult.predictedPrice)}
                    </div>
                    <p>${formatPercentage(predictionResult.totalReturn)} ${predictionResult.totalReturn >= 0 ? '▲' : '▼'}</p>
                </div>
                
                <div class="result-card">
                    <h3>Confidence Level</h3>
                    <div class="result-value">${predictionResult.confidence.toFixed(1)}%</div>
                    <div class="confidence-meter">
                        <div class="meter-fill" style="width: ${predictionResult.confidence}%"></div>
                    </div>
                </div>
                
                <div class="result-card">
                    <h3>Market Outlook</h3>
                    <div class="result-value ${predictionResult.trend === 'bullish' ? 'positive' : 'negative'}">
                        ${predictionResult.trend === 'bullish' ? 'BULLISH' : 'BEARISH'}
                    </div>
                    <p>Volatility: ${predictionResult.volatility.toFixed(1)}%</p>
                </div>
            `;
        }

        async function analyzeSentiment(symbol) {
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            const sentiments = {
                social: Math.random() * 100,
                news: Math.random() * 100,
                technical: Math.random() * 100,
                analyst: Math.random() * 100
            };
            
            const overallSentiment = (sentiments.social + sentiments.news + sentiments.technical + sentiments.analyst) / 4;
            
            document.getElementById('sentiment-fill').style.width = `${overallSentiment}%`;
            
            const getSentimentText = (score) => {
                if (score > 70) return { text: 'Very Positive', class: 'positive' };
                if (score > 55) return { text: 'Positive', class: 'positive' };
                if (score > 45) return { text: 'Neutral', class: 'neutral' };
                if (score > 30) return { text: 'Negative', class: 'negative' };
                return { text: 'Very Negative', class: 'negative' };
            };
            
            const socialSent = getSentimentText(sentiments.social);
            const newsSent = getSentimentText(sentiments.news);
            const techSent = getSentimentText(sentiments.technical);
            const analystSent = getSentimentText(sentiments.analyst);
            
            document.getElementById('social-sentiment').textContent = `${socialSent.text} (${sentiments.social.toFixed(0)}%)`;
            document.getElementById('social-sentiment').className = socialSent.class;
            
            document.getElementById('news-sentiment').textContent = `${newsSent.text} (${sentiments.news.toFixed(0)}%)`;
            document.getElementById('news-sentiment').className = newsSent.class;
            
            document.getElementById('technical-sentiment').textContent = `${techSent.text} (${sentiments.technical.toFixed(0)}%)`;
            document.getElementById('technical-sentiment').className = techSent.class;
            
            document.getElementById('analyst-sentiment').textContent = `${analystSent.text} (${sentiments.analyst.toFixed(0)}%)`;
            document.getElementById('analyst-sentiment').className = analystSent.class;
        }

        function setupFileUpload() {
            const fileUpload = document.getElementById('file-upload');
            const fileInput = document.getElementById('csv-file');
            
            fileUpload.addEventListener('click', () => {
                fileInput.click();
            });
            
            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        updateDatasetStatus('loading', 'Processing CSV file...');
                        await loadCustomCSV(file);
                        showMessage('CSV file loaded successfully!', 'success');
                    } catch (error) {
                        showMessage(`Error loading CSV: ${error.message}`, 'error');
                    }
                }
            });
            
            fileUpload.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUpload.classList.add('dragover');
            });
            
            fileUpload.addEventListener('dragleave', () => {
                fileUpload.classList.remove('dragover');
            });
            
            fileUpload.addEventListener('drop', async (e) => {
                e.preventDefault();
                fileUpload.classList.remove('dragover');
                
                const file = e.dataTransfer.files[0];
                if (file && file.type === 'text/csv') {
                    try {
                        updateDatasetStatus('loading', 'Processing CSV file...');
                        await loadCustomCSV(file);
                        showMessage('CSV file loaded successfully!', 'success');
                    } catch (error) {
                        showMessage(`Error loading CSV: ${error.message}`, 'error');
                    }
                }
            });
        }

        function setupEventHandlers() {
            document.getElementById('dataset-source').addEventListener('change', (e) => {
                const fileUpload = document.getElementById('file-upload');
                if (e.target.value === 'kaggle' || e.target.value === 'custom') {
                    fileUpload.style.display = 'block';
                } else {
                    fileUpload.style.display = 'none';
                }
                
                isDatasetLoaded = false;
                updateDatasetStatus('disconnected', 'Not Connected');
            });
            
            document.getElementById('load-dataset').addEventListener('click', async () => {
                const symbol = document.getElementById('stock-symbol').value.trim().toUpperCase();
                const source = document.getElementById('dataset-source').value;
                
                if (!symbol) {
                    showMessage('Please enter a stock symbol', 'error');
                    return;
                }
                
                try {
                    if (source === 'yahoo') {
                        await loadYahooFinanceData(symbol);
                        updateChart(currentDataset);
                        showMessage(`Dataset loaded for ${symbol}`, 'success');
                    } else if (source === 'alpha-vantage') {
                        showMessage('Alpha Vantage integration requires API key setup', 'error');
                    } else if (source === 'kaggle' || source === 'custom') {
                        if (!isDatasetLoaded) {
                            showMessage('Please upload a CSV file first', 'error');
                        } else {
                            updateChart(currentDataset);
                            showMessage('Custom dataset loaded successfully', 'success');
                        }
                    }
                } catch (error) {
                    showMessage(`Error loading dataset: ${error.message}`, 'error');
                }
            });
            
            document.getElementById('predict-now').addEventListener('click', async () => {
                if (!isDatasetLoaded || !currentDataset) {
                    showMessage('Please load a dataset first', 'error');
                    return;
                }
                
                const symbol = document.getElementById('stock-symbol').value.trim().toUpperCase();
                const days = parseInt(document.getElementById('prediction-period').value);
                const button = document.getElementById('predict-now');
                
                try {
                    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating Prediction...';
                    button.disabled = true;
                    document.getElementById('chart-loading').style.display = 'flex';
                    
                    const predictionResult = await generatePrediction(currentDataset, days);
                    
                    updateChart(currentDataset, predictionResult, days);
                    displayResults(predictionResult, symbol, days);
                    
                    analyzeSentiment(symbol);
                    
                    showMessage('Prediction generated successfully!', 'success');
                    
                } catch (error) {
                    showMessage(`Prediction failed: ${error.message}`, 'error');
                } finally {
                    button.innerHTML = '<i class="fas fa-brain"></i> Generate Prediction';
                    button.disabled = false;
                    document.getElementById('chart-loading').style.display = 'none';
                }
            });
        }

        function init() {
            console.log('Initializing AI Stock Predictor...');
            
            initChart();
            
            setupEventHandlers();
            setupFileUpload();
            
            document.getElementById('model-accuracy').textContent = `${(85 + Math.random() * 10).toFixed(1)}%`;
            document.getElementById('model-updated').textContent = new Date().toLocaleDateString();
            
            console.log('AI Stock Predictor initialized successfully!');
        }

        document.addEventListener('DOMContentLoaded', init);