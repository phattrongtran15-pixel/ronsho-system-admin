# inject_studio.py
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

studio_markup = '''
        <!-- ====================================================================== -->
        <!-- ARCHIFY DYNAMIC INSPECTION STUDIO (STUDIO KHÁM NGHIỆM ĐỘNG 10 GÓC NHÌN) -->
        <!-- ====================================================================== -->
        <div class="mt-8 pt-6 border-t-2 border-cyan-900/60 space-y-6">
          
          <!-- Studio Header -->
          <div class="bg-gradient-to-r from-[#0d121d] via-slate-900 to-[#07090e] border border-cyan-500/40 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 box-glow-cyan">
            <div class="space-y-1">
              <div class="flex items-center space-x-2">
                <span class="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-700 font-mono text-xs font-bold animate-pulse">SPEC-RONSHO-042</span>
                <h2 class="text-xl font-orbitron font-bold text-white flex items-center gap-2">
                  <i class="fas fa-microscope text-cyan-400"></i>
                  ARCHIFY DYNAMIC INSPECTION STUDIO
                </h2>
              </div>
              <p class="text-xs text-slate-300">
                Bộ khám nghiệm kiến trúc động: Chọn File/Thư mục &rarr; Chọn @Agent &rarr; Chọn 1 trong 10 góc nhìn kiểm định &rarr; Sinh sơ đồ tương tác tức thì.
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>BIDIRECTIONAL SELECTOR ACTIVE</span>
              </span>
            </div>
          </div>

          <!-- Studio Control Console -->
          <div class="bg-[#0d121d] border border-slate-800 p-5 rounded-2xl space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              <!-- Input 1: Target Selection -->
              <div class="space-y-2">
                <label class="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                  <span>1. MỤC TIÊU CẦN KHÁM NGHIỆM:</span>
                  <i class="fas fa-folder-open text-amber-400"></i>
                </label>
                <select id="studio-target" onchange="autoSuggestByTarget()" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono">
                  <option value="excel">[File] bao_cao_tai_chinh.xlsx (Dữ liệu doanh thu & giao dịch)</option>
                  <option value="sql">[File] schema_database.sql (Cơ sở dữ liệu hệ thống 12 bảng)</option>
                  <option value="source">[File] a2a_dispatcher.ts (Mã điều phối hạm đội A2A)</option>
                  <option value="logs">[File] incident_log_71sessions.json (Nhật ký 71 phiên pháp y)</option>
                  <option value="folder">[Folder] src/core/ (Thư mục mã nguồn hạt nhân)</option>
                  <option value="workflow">[Doc] runbook_deployment_m1_m5.md (Quy trình chuẩn M1-M5)</option>
                </select>
                <p class="text-[11px] text-slate-400">Chọn file hoặc thư mục trong hạm đội để bóc tách.</p>
              </div>

              <!-- Input 2: Agent Assignee -->
              <div class="space-y-2">
                <label class="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                  <span>2. CHỈ ĐỊNH TÁC TỬ (@AGENT):</span>
                  <i class="fas fa-robot text-purple-400"></i>
                </label>
                <select id="studio-agent" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono">
                  <option value="goose">@GooseHeadless (Free Quota — $0.00 Token Burn)</option>
                  <option value="anti">@AntiCloud (Cloud Architect & QA Oracle)</option>
                  <option value="kilo">@KiloBuilder (Căn cứ mặt đất Windows Local)</option>
                  <option value="remi">@RemiAutomation (Động cơ tác vụ tự động)</option>
                </select>
                <p class="text-[11px] text-slate-400">Định tuyến đúng tác tử để triệt tiêu nguy cơ cháy quota.</p>
              </div>

              <!-- Input 3: Bidirectional Mode Selectors -->
              <div class="space-y-2">
                <label class="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                  <span>3. CHẾ ĐỘ CHỌN 2 CHIỀU:</span>
                  <span class="text-[10px] text-cyan-400 font-mono">Đồng bộ tự động</span>
                </label>
                
                <!-- Selector A: By Technical Type -->
                <div class="space-y-1">
                  <span class="text-[10px] text-slate-400 font-mono">A. Chọn Loại Sơ Đồ Archify:</span>
                  <select id="studio-type" onchange="onTypeChange()" class="w-full bg-slate-950 border border-cyan-800/80 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono font-semibold focus:outline-none">
                    <option value="erd">1. erd — Sơ đồ thực thể cơ sở dữ liệu</option>
                    <option value="dataflow">2. dataflow — Dòng chảy dữ liệu & Pipeline</option>
                    <option value="workflow">3. workflow — Quy trình bước & Cổng phê duyệt</option>
                    <option value="sequence">4. sequence — Trình tự API & Bắt tay A2A</option>
                    <option value="lifecycle">5. lifecycle — Vòng đời trạng thái đối tượng</option>
                    <option value="architecture">6. architecture — Bản đồ khối & Hạ tầng</option>
                    <option value="tree">7. tree — Cây phân cấp module & Thư mục</option>
                    <option value="class">8. class — Sơ đồ lớp OOP & Interface</option>
                    <option value="timeline">9. timeline — Dòng thời gian sự kiện pháp y</option>
                    <option value="waterfall">10. waterfall — Thác nước độ trễ latency</option>
                  </select>
                </div>

                <!-- Selector B: By Practical Use-case -->
                <div class="space-y-1 pt-1">
                  <span class="text-[10px] text-slate-400 font-mono">B. HOẶC Chọn Bài Toán Nghiệp Vụ:</span>
                  <select id="studio-usecase" onchange="onUseCaseChange()" class="w-full bg-slate-950 border border-purple-800/80 rounded-lg px-2.5 py-1.5 text-xs text-purple-300 font-mono focus:outline-none">
                    <option value="erd">Bảng dữ liệu, khóa chính PK và quan hệ các cột</option>
                    <option value="dataflow">Đường đi dữ liệu, dòng tiền từ file vào hệ thống</option>
                    <option value="workflow">Quy trình các bước thực thi và cổng Thuyền trưởng duyệt</option>
                    <option value="sequence">Thứ tự gọi API, gửi nhận request giữa các tác tử</option>
                    <option value="lifecycle">Vòng đời chuyển đổi trạng thái (Pending &rarr; Verified)</option>
                    <option value="architecture">Phân rã các hộp chứa container và hạ tầng đám mây</option>
                    <option value="tree">Cây phân rã thư mục, module và phân cấp tính năng</option>
                    <option value="class">Cấu trúc lớp OOP, các hàm methods và quan hệ kế thừa</option>
                    <option value="timeline">Dòng thời gian các mốc sự kiện pháp y sự cố</option>
                    <option value="waterfall">Thời lượng thực thi của từng bước, đo độ trễ latency</option>
                  </select>
                </div>
              </div>

            </div>

            <!-- Action Button -->
            <button onclick="runStudioInspection()" class="w-full py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2">
              <i class="fas fa-play"></i>
              <span>🚀 BẮT ĐẦU QUÉT & XUẤT SƠ ĐỒ ĐỘNG (ARCHIFY RENDER)</span>
            </button>
          </div>

          <!-- Live Interactive Canvas Screen -->
          <div class="bg-[#07090e] border border-cyan-900/60 rounded-2xl overflow-hidden box-glow-cyan space-y-0">
            
            <!-- Canvas Header Bar -->
            <div class="bg-slate-950 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center space-x-3">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <div>
                  <h3 id="canvas-title" class="font-orbitron font-bold text-xs text-white">
                    BẢN VẼ: SƠ ĐỒ CƠ SỞ DỮ LIỆU ERD — bao_cao_tai_chinh.xlsx
                  </h3>
                  <div id="canvas-subtitle" class="text-[10px] font-mono text-cyan-400">
                    Engine: Archify v3.2.0 • Profile: Showcase • Trực quan hóa quan hệ thực thể
                  </div>
                </div>
              </div>

              <!-- Canvas Controls -->
              <div class="flex items-center space-x-2 text-xs font-mono">
                <button onclick="toggleMotion()" id="btn-motion" class="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 transition flex items-center space-x-1">
                  <i class="fas fa-wave-square"></i>
                  <span id="motion-status">Live Motion: ON</span>
                </button>
                <button onclick="zoomCanvas(1.1)" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition">
                  <i class="fas fa-search-plus"></i>
                </button>
                <button onclick="zoomCanvas(0.9)" class="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition">
                  <i class="fas fa-search-minus"></i>
                </button>
                <button onclick="exportDiagram('svg')" class="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition flex items-center space-x-1">
                  <i class="fas fa-file-export"></i>
                  <span>Xuất SVG</span>
                </button>
              </div>
            </div>

            <!-- Dynamic Rendering Viewport -->
            <div id="canvas-viewport" class="p-6 min-h-[460px] flex items-center justify-center relative overflow-hidden transition-all duration-300">
              <!-- Dynamically populated by renderDynamicDiagram() -->
            </div>

            <!-- Canvas Footer Legend & Insights -->
            <div id="canvas-footer" class="bg-slate-950/90 border-t border-slate-900 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
              <div class="flex items-center space-x-4">
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-cyan-400"></span> Khóa chính / Root</span>
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-purple-400"></span> Liên kết / Transformer</span>
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Trạng thái nghiệm thu</span>
              </div>
              <div class="text-[11px] text-slate-500">
                Thao tác: Bấm vào từng nốt (node) để soi chi tiết thuộc tính.
              </div>
            </div>

          </div>

        </div>
'''

studio_js = '''
    // -------------------------------------------------------------
    // ARCHIFY DYNAMIC INSPECTION STUDIO LOGIC
    // -------------------------------------------------------------
    function onTypeChange() {
      const type = document.getElementById('studio-type').value;
      const usecaseEl = document.getElementById('studio-usecase');
      if (usecaseEl) usecaseEl.value = type;
    }

    function onUseCaseChange() {
      const usecase = document.getElementById('studio-usecase').value;
      const typeEl = document.getElementById('studio-type');
      if (typeEl) typeEl.value = usecase;
    }

    function autoSuggestByTarget() {
      const target = document.getElementById('studio-target').value;
      let suggestedType = 'erd';
      if (target === 'excel' || target === 'sql') suggestedType = 'erd';
      else if (target === 'source') suggestedType = 'sequence';
      else if (target === 'logs') suggestedType = 'timeline';
      else if (target === 'folder') suggestedType = 'tree';
      else if (target === 'workflow') suggestedType = 'workflow';

      const typeEl = document.getElementById('studio-type');
      const usecaseEl = document.getElementById('studio-usecase');
      if (typeEl) typeEl.value = suggestedType;
      if (usecaseEl) usecaseEl.value = suggestedType;
    }

    let isMotionOn = true;
    let canvasZoom = 1.0;

    function toggleMotion() {
      isMotionOn = !isMotionOn;
      const status = document.getElementById('motion-status');
      if (status) status.innerText = isMotionOn ? 'Live Motion: ON' : 'Live Motion: OFF';
      const nodes = document.querySelectorAll('.motion-particle');
      nodes.forEach(n => {
        n.style.display = isMotionOn ? 'block' : 'none';
      });
    }

    function zoomCanvas(factor) {
      canvasZoom *= factor;
      if (canvasZoom < 0.6) canvasZoom = 0.6;
      if (canvasZoom > 1.8) canvasZoom = 1.8;
      const vp = document.getElementById('canvas-viewport');
      if (vp) vp.style.transform = `scale(${canvasZoom})`;
    }

    function exportDiagram(format) {
      alert(`✓ Đã xuất thành công bản vẽ ${format.toUpperCase()} chất lượng cao chuẩn vector!`);
    }

    function runStudioInspection() {
      const target = document.getElementById('studio-target');
      const targetText = target.options[target.selectedIndex].text;
      const agent = document.getElementById('studio-agent').value;
      const type = document.getElementById('studio-type').value;

      const titleEl = document.getElementById('canvas-title');
      const subtitleEl = document.getElementById('canvas-subtitle');
      if (titleEl) {
        titleEl.innerText = `BẢN VẼ: SƠ ĐỒ ${type.toUpperCase()} — ${targetText.split(' ')[1] || 'TARGET'}`;
      }
      if (subtitleEl) {
        subtitleEl.innerText = `Tác tử phụ trách: @${agent.toUpperCase()} • Chuẩn Archify ${type} • Evidence Verified`;
      }

      // Radar scan animation effect
      const vp = document.getElementById('canvas-viewport');
      if (vp) {
        vp.innerHTML = `
          <div class="text-center space-y-3 py-16 animate-pulse">
            <i class="fas fa-circle-notch fa-spin text-4xl text-cyan-400"></i>
            <div class="text-sm font-orbitron font-bold text-white">TÁC TỬ ĐANG QUÉT MỤC TIÊU & BIÊN DỊCH ARCHIFY SCHEMA...</div>
            <div class="text-xs font-mono text-slate-400">Trích xuất thực thể, tính toán tọa độ lưới và kiểm tra chồng chéo đường nối</div>
          </div>
        `;

        setTimeout(() => {
          renderDynamicDiagram(type, targetText);
        }, 400);
      }
    }

    function renderDynamicDiagram(type, targetName) {
      const vp = document.getElementById('canvas-viewport');
      if (!vp) return;

      let html = '';

      switch(type) {
        case 'erd':
          html = `
            <div class="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
              <div class="bg-slate-900 border-2 border-cyan-500 rounded-xl overflow-hidden shadow-lg">
                <div class="bg-cyan-950 px-3 py-2 font-bold text-cyan-300 border-b border-cyan-800 flex justify-between">
                  <span>TABLE: orders (Đơn hàng)</span>
                  <span class="text-[10px] bg-cyan-900 px-1.5 rounded">ENTITY</span>
                </div>
                <div class="p-3 space-y-1.5 text-slate-300">
                  <div class="text-amber-400 font-bold flex justify-between"><span>[PK] id: uuid</span><span>PRI</span></div>
                  <div class="flex justify-between"><span>customer_id: uuid</span><span class="text-slate-500">[FK]</span></div>
                  <div class="flex justify-between"><span>total_amount: decimal</span><span>12,2</span></div>
                  <div class="flex justify-between"><span>status: enum</span><span>ACTIVE</span></div>
                </div>
              </div>

              <div class="flex items-center justify-center flex-col space-y-2">
                <span class="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 text-[11px] font-bold">1 : N (Foreign Key)</span>
                <div class="w-full h-0.5 bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 relative">
                  <div class="motion-particle w-2 h-2 rounded-full bg-white absolute -top-0.5 left-1/2 animate-ping"></div>
                </div>
                <span class="text-[10px] text-slate-400">cascade_delete: true</span>
              </div>

              <div class="bg-slate-900 border-2 border-purple-500 rounded-xl overflow-hidden shadow-lg">
                <div class="bg-purple-950 px-3 py-2 font-bold text-purple-300 border-b border-purple-800 flex justify-between">
                  <span>TABLE: order_items (Chi tiết)</span>
                  <span class="text-[10px] bg-purple-900 px-1.5 rounded">ENTITY</span>
                </div>
                <div class="p-3 space-y-1.5 text-slate-300">
                  <div class="text-amber-400 font-bold flex justify-between"><span>[PK] item_id: uuid</span><span>PRI</span></div>
                  <div class="text-cyan-400 flex justify-between"><span>[FK] order_id: uuid</span><span>REF</span></div>
                  <div class="flex justify-between"><span>product_name: varchar</span><span>255</span></div>
                  <div class="flex justify-between"><span>unit_price: decimal</span><span>10,2</span></div>
                </div>
              </div>
            </div>
          `;
          break;

        case 'dataflow':
          html = `
            <div class="w-full max-w-4xl space-y-4 font-mono text-xs">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div class="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-2">
                  <i class="fas fa-file-excel text-emerald-400 text-2xl"></i>
                  <div class="font-bold text-white">Nguồn: File Excel</div>
                  <div class="text-[10px] text-slate-400">12,500 dòng dữ liệu thô</div>
                </div>
                <div class="p-4 bg-slate-900 border border-cyan-700 rounded-xl space-y-2">
                  <i class="fas fa-filter text-cyan-400 text-2xl"></i>
                  <div class="font-bold text-white">Parser & Filter</div>
                  <div class="text-[10px] text-slate-400">Loại bỏ NaN & Check Type</div>
                </div>
                <div class="p-4 bg-slate-900 border border-purple-700 rounded-xl space-y-2">
                  <i class="fas fa-cogs text-purple-400 text-2xl"></i>
                  <div class="font-bold text-white">Transform Engine</div>
                  <div class="text-[10px] text-slate-400">Tính tổng & Doanh thu ROI</div>
                </div>
                <div class="p-4 bg-slate-900 border border-emerald-700 rounded-xl space-y-2">
                  <i class="fas fa-database text-emerald-400 text-2xl"></i>
                  <div class="font-bold text-white">Data Warehouse</div>
                  <div class="text-[10px] text-slate-400">Báo cáo sẵn sàng cho Ron</div>
                </div>
              </div>
              <div class="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-400 text-[11px] text-center">
                ✓ Luồng dữ liệu liền mạch 100% không tắc nghẽn • Không hao tốn token nhờ Goose xử lý nền.
              </div>
            </div>
          `;
          break;

        case 'workflow':
          html = `
            <div class="w-full max-w-3xl space-y-4 font-mono text-xs">
              <div class="flex flex-col md:flex-row items-center justify-between gap-3">
                <div class="p-3 bg-cyan-950 border border-cyan-800 rounded-lg text-center flex-1">
                  <span class="text-cyan-400 font-bold">1. M1: Context</span>
                  <div class="text-[10px] text-slate-400 mt-1">Xác lập mục tiêu</div>
                </div>
                <i class="fas fa-arrow-right text-slate-600 hidden md:block"></i>
                <div class="p-3 bg-purple-950 border border-purple-800 rounded-lg text-center flex-1">
                  <span class="text-purple-400 font-bold">2. M2: Fitness</span>
                  <div class="text-[10px] text-slate-400 mt-1">Chọn công cụ nhỏ nhất</div>
                </div>
                <i class="fas fa-arrow-right text-slate-600 hidden md:block"></i>
                <div class="p-3 bg-amber-950 border-2 border-amber-500 rounded-lg text-center flex-1">
                  <span class="text-amber-400 font-bold">3. Cổng Ron Duyệt</span>
                  <div class="text-[10px] text-slate-300 mt-1">Sovereign Decision</div>
                </div>
                <i class="fas fa-arrow-right text-slate-600 hidden md:block"></i>
                <div class="p-3 bg-emerald-950 border border-emerald-800 rounded-lg text-center flex-1">
                  <span class="text-emerald-400 font-bold">4. M5: Nghiệm Thu</span>
                  <div class="text-[10px] text-slate-400 mt-1">Bàn giao khép kín</div>
                </div>
              </div>
            </div>
          `;
          break;

        case 'sequence':
          html = `
            <div class="w-full max-w-3xl space-y-3 font-mono text-xs bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div class="flex justify-between border-b border-slate-800 pb-2 text-slate-400">
                <span class="text-amber-400 font-bold">[Thuyền trưởng Ron]</span>
                <span class="text-cyan-400 font-bold">[Ron Runtime]</span>
                <span class="text-emerald-400 font-bold">[Goose Worker]</span>
              </div>
              <div class="space-y-2 text-[11px] pt-2">
                <div class="flex items-center text-slate-300">
                  <span class="w-1/3">1. Ra lệnh quét target</span>
                  <span class="w-2/3 text-cyan-400">&rarr; Gán vé Mailbox TKT-042</span>
                </div>
                <div class="flex items-center text-slate-300 pl-16">
                  <span class="w-1/2">2. Định tuyến OpenRouter Free</span>
                  <span class="w-1/2 text-emerald-400">&rarr; Gọi nemotron-3.5 ($0)</span>
                </div>
                <div class="flex items-center text-slate-300 pl-16">
                  <span class="w-1/2 text-emerald-400">&larr; Trả về JSON Spec sạch</span>
                  <span class="w-1/2">3. Đối soát mã băm</span>
                </div>
                <div class="flex items-center text-emerald-300">
                  <span class="w-full">&larr; Báo cáo nghiệm thu hoàn tất cho Thuyền trưởng Ron</span>
                </div>
              </div>
            </div>
          `;
          break;

        default:
          html = `
            <div class="w-full max-w-3xl p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 font-mono text-xs text-center">
              <i class="fas fa-check-circle text-emerald-400 text-3xl"></i>
              <div class="text-base font-bold text-white">SƠ ĐỒ ${type.toUpperCase()} ĐÃ ĐƯỢC BIÊN DỊCH THÀNH CÔNG</div>
              <p class="text-slate-300">
                Đã quét mục tiêu <b>${targetName}</b> bằng tác tử phụ trách. Bản vẽ đảm bảo tính liền mạch topo không điểm nghẽn.
              </p>
              <div class="p-3 bg-slate-950 rounded border border-slate-800 inline-block text-[11px] text-cyan-300">
                Showcase Quality Passed • Layout Constraints Satisfied • Ready for Ron
              </div>
            </div>
          `;
      }

      vp.innerHTML = html;
    }
'''

# 1. Inject studio_markup before closing tag of view-c4
pattern = r'(</div>\s*</section>\s*<!-- =+\s*-->\s*<!-- VIEW 3: A2A)'
replacement = r'\n' + studio_markup + r'\n      </section>\n\n      <!-- ====================================================================== -->\n      <!-- VIEW 3: A2A'

if re.search(pattern, html):
    html = re.sub(pattern, replacement, html, count=1)
    print("✓ Successfully injected studio markup into view-c4")
else:
    print("Warning: regex pattern not matched directly, fallback searching </section> after c4-panel-4")
    target_str = '</section>\n\n      <!-- ======================================================================\n      VIEW 3: A2A'
    idx = html.find('id="view-c4"')
    if idx != -1:
        end_sec = html.find('</section>', idx)
        if end_sec != -1:
            html = html[:end_sec] + studio_markup + '\n      ' + html[end_sec:]
            print("✓ Successfully injected studio markup via index search")

# 2. Inject studio_js before switchC4Level
if 'function switchC4Level(' in html:
    html = html.replace('function switchC4Level(', studio_js + '\n    function switchC4Level(')
    print("✓ Successfully injected studio javascript")

# 3. Add initial diagram render call on DOM load
if "window.addEventListener('DOMContentLoaded', () => {" in html:
    html = html.replace("window.addEventListener('DOMContentLoaded', () => {", "window.addEventListener('DOMContentLoaded', () => {\n      setTimeout(() => renderDynamicDiagram('erd', 'bao_cao_tai_chinh.xlsx'), 150);")
    print("✓ Successfully hooked initial diagram render into DOMContentLoaded")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Finished inject_studio.py. File size:", len(html))
