// SPTLDV Model - Sistem Pertidaksamaan Linear Dua Variabel

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];

// Initialize with 2 default equations
document.addEventListener('DOMContentLoaded', () => {
    addEquation();
    addEquation();
    drawGraph();
});

function addEquation() {
    const container = document.getElementById('equationsContainer');
    const index = container.querySelectorAll('.equation-box').length;
    const color = COLORS[index % COLORS.length];
    
    const equationBox = document.createElement('div');
    equationBox.className = 'equation-box';
    equationBox.id = `equation-${index}`;
    
    equationBox.innerHTML = `
        <div class="equation-label">
            <span class="color-indicator" style="background-color: ${color}"></span>
            PERSAMAAN ${index + 1}
        </div>
        <div class="equation-inputs">
            <input type="number" class="coeff-a" value="1" placeholder="1" step="0.1" title="Koefisien x">
            <span class="equation-operator">x +</span>
            <input type="number" class="coeff-b" value="1" placeholder="1" step="0.1" title="Koefisien y">
            <span class="equation-operator">y</span>
            <select class="operator" title="Pilih operator pertidaksamaan">
                <option value="<">&lt;</option>
                <option value="<=">&le;</option>
                <option value=">">&gt;</option>
                <option value=">=">&ge;</option>
            </select>
            <input type="number" class="constant" value="5" placeholder="5" step="0.1" title="Konstanta">
        </div>
        <div class="delete-btn-container">
            <button class="btn-danger" onclick="deleteEquation(${index})">❌ HAPUS</button>
        </div>
    `;
    
    container.appendChild(equationBox);
}

function deleteEquation(index) {
    const equationBox = document.getElementById(`equation-${index}`);
    if (equationBox) {
        equationBox.remove();
    }
}

function getEquationValues() {
    const boxes = document.querySelectorAll('.equation-box');
    const values = [];
    
    boxes.forEach((box, i) => {
        const a = parseFloat(box.querySelector('.coeff-a').value) || 0;
        const b = parseFloat(box.querySelector('.coeff-b').value) || 0;
        const operator = box.querySelector('.operator').value;
        const c = parseFloat(box.querySelector('.constant').value) || 0;
        
        values.push({
            index: i,
            color: COLORS[i % COLORS.length],
            a: a,
            b: b,
            operator: operator,
            c: c
        });
    });
    
    return values;
}

function testPoint() {
    const x = parseFloat(document.getElementById('testX').value);
    const y = parseFloat(document.getElementById('testY').value);
    const minX = parseFloat(document.getElementById('minX').value) || 0;
    const minY = parseFloat(document.getElementById('minY').value) || 0;
    
    const equations = getEquationValues();
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');
    
    let allValid = true;
    let html = '';
    
    // LANGKAH 1: Cek Batasan X dan Y
    html += `
        <div class="step-container ${(x >= minX && y >= minY) ? 'valid' : 'invalid'}">
            <div style="margin-bottom: 8px;">
                <span class="step-number">1</span>
                <span class="step-content" style="font-size: 1.1em;">CEK BATASAN VARIABEL</span>
            </div>
            <div class="calculation">
                x = ${x} ${x >= minX ? '✓' : '✗'} harus ≥ ${minX}
            </div>
            <div class="calculation">
                y = ${y} ${y >= minY ? '✓' : '✗'} harus ≥ ${minY}
            </div>
    `;
    
    if (x < minX || y < minY) {
        allValid = false;
        html += `<div style="margin-top: 8px; color: #721c24; font-weight: 700;">⚠️ BATASAN TIDAK TERPENUHI!</div>`;
    } else {
        html += `<div style="margin-top: 8px; color: #155724; font-weight: 700;">✅ BATASAN TERPENUHI!</div>`;
    }
    
    html += `</div>`;
    
    // LANGKAH 2-N: Cek Setiap Persamaan
    equations.forEach((eq, i) => {
        const leftSide = eq.a * x + eq.b * y;
        const rightSide = eq.c;
        
        let valid = false;
        let operator = '';
        let operatorSymbol = '';
        
        switch(eq.operator) {
            case '<':
                valid = leftSide < rightSide;
                operator = '<';
                operatorSymbol = 'lebih kecil dari';
                break;
            case '<=':
                valid = leftSide <= rightSide;
                operator = '≤';
                operatorSymbol = 'kurang dari atau sama dengan';
                break;
            case '>':
                valid = leftSide > rightSide;
                operator = '>';
                operatorSymbol = 'lebih besar dari';
                break;
            case '>=':
                valid = leftSide >= rightSide;
                operator = '≥';
                operatorSymbol = 'lebih besar atau sama dengan';
                break;
        }
        
        if (!valid) {
            allValid = false;
        }
        
        const statusIcon = valid ? '✅' : '❌';
        
        html += `
            <div class="step-container ${valid ? 'valid' : 'invalid'}">
                <div style="margin-bottom: 12px;">
                    <span class="step-number">${i + 2}</span>
                    <span class="step-content" style="font-size: 1.1em;">SUBSTITUSI KE PERSAMAAN ${i + 1}</span>
                </div>
                
                <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 10px;">
                    <div class="step-content" style="margin-bottom: 8px;">
                        <strong>Persamaan:</strong> ${eq.a}x + ${eq.b}y ${operator} ${eq.c}
                    </div>
                    
                    <div class="calculation">
                        ${eq.a}(${x}) + ${eq.b}(${y}) ${operator} ${eq.c}
                    </div>
                    
                    <div class="calculation">
                        ${eq.a * x} + ${eq.b * y} ${operator} ${eq.c}
                    </div>
                    
                    <div class="calculation">
                        ${leftSide.toFixed(2)} ${operator} ${rightSide.toFixed(2)}
                    </div>
                </div>
                
                <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 8px;">
                    <div class="step-content">
                        <strong>Apakah ${leftSide.toFixed(2)} ${operatorSymbol} ${rightSide.toFixed(2)}?</strong>
                    </div>
                </div>
                
                <div style="font-size: 1.1em; font-weight: 800; padding: 12px; border-radius: 8px; background: ${valid ? '#d4edda' : '#f8d7da'};
                           color: ${valid ? '#155724' : '#721c24'};">
                    ${statusIcon} ${valid ? 'BENAR - Pertidaksamaan terpenuhi!' : 'SALAH - Pertidaksamaan tidak terpenuhi!'}
                </div>
            </div>
        `;
    });
    
    // KESIMPULAN AKHIR
    const conclusionStep = equations.length + 2;
    html += `
        <div class="step-container ${allValid ? 'valid' : 'invalid'}">
            <div style="margin-bottom: 12px;">
                <span class="step-number">${conclusionStep}</span>
                <span class="step-content" style="font-size: 1.1em;">KESIMPULAN AKHIR</span>
            </div>
            
            <div class="final-conclusion ${allValid ? 'valid' : 'invalid'}">
                ${allValid ? '✅ TITIK (' + x + ', ' + y + ') MEMENUHI SEMUA PERTIDAKSAMAAN' : '❌ TITIK (' + x + ', ' + y + ') TIDAK MEMENUHI SEMUA PERTIDAKSAMAAN'}
            </div>
            
            ${allValid ? 
                '<div style="margin-top: 12px; text-align: center; font-weight: 700; color: #155724; font-size: 1em;">Titik ini ada di dalam DAERAH PENYELESAIAN ✓</div>' :
                '<div style="margin-top: 12px; text-align: center; font-weight: 700; color: #721c24; font-size: 1em;">Titik ini berada di LUAR DAERAH PENYELESAIAN ✗</div>'
            }
        </div>
    `;
    
    resultSection.classList.remove('valid', 'invalid');
    resultSection.classList.add(allValid ? 'valid' : 'invalid');
    resultSection.style.display = 'block';
    resultContent.innerHTML = html;
    
    // Scroll ke hasil
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function drawGraph() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 30; // pixels per unit
    
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    drawGrid(ctx, width, height, centerX, centerY, scale);
    
    // Draw axes
    drawAxes(ctx, width, height, centerX, centerY, scale);
    
    // Get equations and constraints
    const equations = getEquationValues();
    const minX = parseFloat(document.getElementById('minX').value) || 0;
    const minY = parseFloat(document.getElementById('minY').value) || 0;
    
    // Draw constraint lines and shade regions
    equations.forEach((eq) => {
        drawInequality(ctx, eq, centerX, centerY, scale, width, height);
    });
    
    // Draw constraint region x >= minX
    if (minX > 0) {
        const lineX = centerX + minX * scale;
        ctx.strokeStyle = '#FF00FF';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, height);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = 'rgba(255, 0, 255, 0.05)';
        ctx.fillRect(lineX, 0, width - lineX, height);
    }
    
    // Draw constraint region y >= minY
    if (minY > 0) {
        const lineY = centerY - minY * scale;
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(width, lineY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = 'rgba(0, 255, 255, 0.05)';
        ctx.fillRect(0, 0, width, lineY);
    }
    
    // Draw test point
    const testX = parseFloat(document.getElementById('testX').value) || 0;
    const testY = parseFloat(document.getElementById('testY').value) || 0;
    const pointX = centerX + testX * scale;
    const pointY = centerY - testY * scale;
    
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pointX, pointY, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(pointX, pointY, 8, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Label test point
    ctx.fillStyle = '#000';
    ctx.font = 'bold 13px Arial';
    ctx.fillText(`P(${testX}, ${testY})`, pointX + 10, pointY - 10);
}

function drawGrid(ctx, width, height, centerX, centerY, scale) {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = -10; i <= 10; i++) {
        const x = centerX + i * scale;
        if (x > 0 && x < width) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
    }
    
    // Horizontal grid lines
    for (let i = -10; i <= 10; i++) {
        const y = centerY + i * scale;
        if (y > 0 && y < height) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }
}

function drawAxes(ctx, width, height, centerX, centerY, scale) {
    // Axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();
    
    // Tick marks and numbers
    ctx.fillStyle = '#000';
    ctx.font = 'bold 12px Arial';
    
    for (let i = 1; i <= 10; i++) {
        // X-axis ticks
        const x = centerX + i * scale;
        if (x < width) {
            ctx.beginPath();
            ctx.moveTo(x, centerY - 5);
            ctx.lineTo(x, centerY + 5);
            ctx.stroke();
            ctx.fillText(i.toString(), x - 5, centerY + 20);
        }
        
        // Y-axis ticks
        const y = centerY - i * scale;
        if (y > 0) {
            ctx.beginPath();
            ctx.moveTo(centerX - 5, y);
            ctx.lineTo(centerX + 5, y);
            ctx.stroke();
            ctx.fillText(i.toString(), centerX - 25, y + 5);
        }
    }
    
    // Origin
    ctx.fillText('0', centerX - 15, centerY + 20);
    
    // Axis labels
    ctx.font = 'bold 14px Arial';
    ctx.fillText('x', width - 20, centerY - 10);
    ctx.fillText('y', centerX + 10, 20);
}

function drawInequality(ctx, eq, centerX, centerY, scale, width, height) {
    const { a, b, operator, c, color } = eq;
    
    // Find two points on the line ax + by = c
    let p1, p2;
    
    if (b !== 0) {
        // When x = 0: by = c => y = c/b
        const y1 = c / b;
        p1 = { x: 0, y: y1 };
        
        // When x = 10: y = (c - 10a) / b
        const y2 = (c - 10 * a) / b;
        p2 = { x: 10, y: y2 };
    } else if (a !== 0) {
        // Vertical line: ax = c => x = c/a
        const x = c / a;
        p1 = { x: x, y: -10 };
        p2 = { x: x, y: 10 };
    } else {
        return; // Invalid equation
    }
    
    // Convert to screen coordinates
    const screen1 = {
        x: centerX + p1.x * scale,
        y: centerY - p1.y * scale
    };
    
    const screen2 = {
        x: centerX + p2.x * scale,
        y: centerY - p2.y * scale
    };
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(screen1.x, screen1.y);
    ctx.lineTo(screen2.x, screen2.y);
    ctx.stroke();
    
    // Shade region based on operator
    if (operator === '<' || operator === '<=') {
        // Shade left/below
        shadeRegion(ctx, a, b, c, centerX, centerY, scale, width, height, color, 0.1);
    } else {
        // Shade right/above
        shadeRegion(ctx, a, b, c, centerX, centerY, scale, width, height, color, 0.1, true);
    }
}

function shadeRegion(ctx, a, b, c, centerX, centerY, scale, width, height, color, alpha, reverse = false) {
    ctx.fillStyle = `rgba(${hexToRgb(color).r}, ${hexToRgb(color).g}, ${hexToRgb(color).b}, ${alpha})`;
    
    // Create a path for the region
    let points = [];
    
    // Sample points along the line and extend perpendicular
    const numSamples = 100;
    for (let i = 0; i < numSamples; i++) {
        const t = i / (numSamples - 1);
        const x = -10 + t * 20;
        
        let y;
        if (b !== 0) {
            y = (c - a * x) / b;
        } else {
            y = 0;
        }
        
        const screenX = centerX + x * scale;
        const screenY = centerY - y * scale;
        
        if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
            points.push({ x: screenX, y: screenY });
        }
    }
    
    if (points.length > 0) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, reverse ? 0 : height);
        
        points.forEach(p => {
            ctx.lineTo(p.x, p.y);
        });
        
        ctx.lineTo(points[points.length - 1].x, reverse ? 0 : height);
        ctx.closePath();
        ctx.fill();
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}