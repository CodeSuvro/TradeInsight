        const ctx = document.getElementById('trading-chart').getContext('2d');
        
        const labels = [];
        const data = [];
        let currentValue = 150;
        
        for (let i = 0; i < 100; i++) {
            labels.push('');
            const change = (Math.random() - 0.5) * 4;
            currentValue += change;
            data.push(currentValue);
        }
        
        const tradingChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'AAPL',
                    data: data,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(100, 116, 139, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
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
        
        setInterval(() => {
            tradingChart.data.labels.push('');
            tradingChart.data.labels.shift();
            
            const lastValue = tradingChart.data.datasets[0].data[tradingChart.data.datasets[0].data.length - 1];
            const change = (Math.random() - 0.5) * 3;
            const newValue = lastValue + change;
            
            tradingChart.data.datasets[0].data.push(newValue);
            tradingChart.data.datasets[0].data.shift();
            
            tradingChart.update();
        }, 2000);
        
        const symbolButtons = document.querySelectorAll('.symbol-btn');
        symbolButtons.forEach(button => {
            button.addEventListener('click', () => {
                symbolButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                tradingChart.data.datasets[0].label = button.textContent;
                
                const newData = [];
                let newValue = 150;
                
                for (let i = 0; i < 100; i++) {
                    const change = (Math.random() - 0.5) * 4;
                    newValue += change;
                    newData.push(newValue);
                }
                
                tradingChart.data.datasets[0].data = newData;
                tradingChart.update();
            });
        });
        
        document.getElementById('predict-btn').addEventListener('click', () => {
            window.open('predict.html', '_blank');
        });
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });