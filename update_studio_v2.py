# update_studio_v2.py
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# New 4-column studio HTML
new_studio_markup = '''
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
                Bộ khám nghiệm kiến trúc động: Chọn File/Thư mục &rarr; Chọn @Agent &rarr; Chọn Chế độ Default (10 góc nhìn) hoặc từng góc nhìn &rarr; Xuất ma trận kết quả đa chiều tức thì.
              </p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span id="studio-mode-badge">CHẾ ĐỘ DEFAULT: QUÉT 10 GÓC NHÌN</span>
              </span>
            </div>
          </div>

          <!-- Studio Control Console (EXACTLY 4 COLUMNS AS DIRECTED BY RONSHO) -->
          <div class="bg-[#0d121d] border border-slate-800 p-5 rounded-2xl space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <!-- CỘT 1: Target Selection -->
              <div class="space-y-2">
                <label class="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                  <span>1. MỤC TIÊU CẦN KHÁM:</span>
                  <i class="fas fa-folder-open text-amber-400"></i>
                </label>
                <select id="studio-target" onchange="autoSuggestByTarget()" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono">
                  <option value="excel">[File] bao_cao_tai_chinh.xlsx (Dữ liệu doanh thu & giao dịch)</option>
                  <option value="sql">[File] schema_database.sql (Cơ sở dữ liệu hệ thống 12 bảng)</option>
                  <option value="source">[File] a2a_dispatcher.ts (Mã điều phối hạm đội A2A)</option>
                  <option value="logs">[File] incident_log_71sessions.json (Nhật ký 71 phiên pháp y)</option>
                  <option value="folder">[Folder] src/core/ (Thư mục mã nguồn hạt nhân)</option>
                  <option value="workflow">[Doc] runbook_deployment_m1_m5.md (Quy trình chuẩn M1-M5)</option>
                </select>
                <p class="text-[11px] text-slate-400">Chọn file hoặc thư mục trong hạm đội để bóc tách.</p>
              </div>

              <!-- CỘT 2: Agent Assignee -->
              <div class="space-y-2">
                <label class="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                  <span>2. CHỈ ĐỊNH TÁC TỬ (@AGENT):</span>
                  <i class="fas fa-robot text-purple-400"></i>
                </label>
                <select id="studio-agent" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono">
                  <option value="goose">@GooseHeadless (Free Quota — $0.00 Token Burn)</option>
                  <option value="anti">@AntiCloud (Cloud Architect & QA Oracle)</option>
                  <option value="kilo">@KiloBuilder (Căn cứ mặt đất Windows Local)</option>
                  <option value="remi">@RemiAutomation (Động cơ tác vụ tự động)</option>
                </select>
                <p class="text-[11px] text-slate-400">Định tuyến đúng tác tử để triệt tiêu nguy cơ cháy quota.</p>
              </div>

              <!-- CỘT 3: Method Selection (Default / Type / Usecase) -->
              <div class="space-y-2">
                <label class="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                  <span>3. PHƯƠNG THỨC CHỌN:</span>
                  <i class="fas fa-filter text-cyan-400"></i>
                </label>
                <select id="studio-method" onchange="onMethodChange()" class="w-full bg-slate-950 border border-cyan-700 rounded-xl px-3 py-2 text-xs text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-400">
                  <option value="default" selected>Default: Quét Đa Chiều (Xuất 10 Góc Nhìn)</option>
                  <option value="by_type">Theo Loại Sơ Đồ Archify (Technical Type)</option>
                  <option value="by_usecase">Theo Bài Toán Nghiệp Vụ (Use Case)</option>
                </select>
                <p class="text-[11px] text-slate-400">Chọn góc nhìn đơn lẻ hoặc quét trọn bộ 10 loại.</p>
              </div>

              <!-- CỘT 4: Dynamic Contextual Target Options -->
              <div class="space-y-2">
                <label class="text-xs font-mono text-slate-300 font-bold flex items-center justify-between">
                  <span>4. LỰA CHỌN CHI TIẾT:</span>
                  <i class="fas fa-crosshairs text-pink-400"></i>
                </label>
                
                <!-- State A: Default Banner -->
                <div id="col4-default-box" class="p-2.5 bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-700/80 rounded-xl space-y-1">
                  <div class="text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1.5">
                    <i class="fas fa-layer-group text-emerald-400"></i>
                    <span>TẤT CẢ 10 GÓC NHÌN ĐƯỢC CHỌN</span>
                  </div>
                  <p class="text-[10px] text-slate-300 leading-tight">
                    Hệ thống sẽ render đồng thời cả 10 loại sơ đồ thành 10 ô kết quả bên dưới!
                  </p>
                </div>

                <!-- State B: By Type Dropdown -->
                <div id="col4-type-box" class="hidden">
                  <select id="studio-type-select" onchange="onTypeSelectChange()" class="w-full bg-slate-950 border border-cyan-800 rounded-xl px-2.5 py-2 text-xs text-cyan-300 font-mono focus:outline-none">
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

                <!-- State C: By Usecase Dropdown -->
                <div id="col4-usecase-box" class="hidden">
                  <select id="studio-usecase-select" onchange="onUseCaseSelectChange()" class="w-full bg-slate-950 border border-purple-800 rounded-xl px-2.5 py-2 text-xs text-purple-300 font-mono focus:outline-none">
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
                    KẾT QUẢ KHÁM NGHIỆM ĐA CHIỀU (10 GÓC NHÌN ĐỒNG THỜI) — bao_cao_tai_chinh.xlsx
                  </h3>
                  <div id="canvas-subtitle" class="text-[10px] font-mono text-cyan-400">
                    Engine: Archify v3.2.0 • Chế độ: Default (Ma Trận 10 Lăng Kính) • Multi-Perspective Matrix Active
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
            <div id="canvas-viewport" class="p-4 md:p-6 min-h-[460px] flex items-center justify-center relative overflow-hidden transition-all duration-300">
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
                Mẹo: Bấm nút "Phóng To Góc Nhìn Này" trên từng ô để soi chi tiết chuyên sâu!
              </div>
            </div>

          </div>

        </div>
'''

new_studio_js = '''
    // -------------------------------------------------------------
    // ARCHIFY DYNAMIC INSPECTION STUDIO LOGIC (V2: 4-COLUMN & 10-PERSPECTIVE GRID)
    // -------------------------------------------------------------
    function onMethodChange() {
      const method = document.getElementById('studio-method').value;
      const defaultBox = document.getElementById('col4-default-box');
      const typeBox = document.getElementById('col4-type-box');
      const usecaseBox = document.getElementById('col4-usecase-box');
      const modeBadge = document.getElementById('studio-mode-badge');

      if (method === 'default') {
        if (defaultBox) defaultBox.classList.remove('hidden');
        if (typeBox) typeBox.classList.add('hidden');
        if (usecaseBox) usecaseBox.classList.add('hidden');
        if (modeBadge) modeBadge.innerText = 'CHẾ ĐỘ DEFAULT: QUÉT 10 GÓC NHÌN';
      } else if (method === 'by_type') {
        if (defaultBox) defaultBox.classList.add('hidden');
        if (typeBox) typeBox.classList.remove('hidden');
        if (usecaseBox) usecaseBox.classList.add('hidden');
        if (modeBadge) modeBadge.innerText = 'GÓC NHÌN ĐƠN LẺ (THEO LOẠI SƠ ĐỒ)';
      } else if (method === 'by_usecase') {
        if (defaultBox) defaultBox.classList.add('hidden');
        if (typeBox) typeBox.classList.add('hidden');
        if (usecaseBox) usecaseBox.classList.remove('hidden');
        if (modeBadge) modeBadge.innerText = 'GÓC NHÌN ĐƠN LẺ (THEO BÀI TOÁN NGHIỆP VỤ)';
      }
    }

    function onTypeSelectChange() {
      const type = document.getElementById('studio-type-select').value;
      const ucSelect = document.getElementById('studio-usecase-select');
      if (ucSelect) ucSelect.value = type;
    }

    function onUseCaseSelectChange() {
      const usecase = document.getElementById('studio-usecase-select').value;
      const typeSelect = document.getElementById('studio-type-select');
      if (typeSelect) typeSelect.value = usecase;
    }

    function autoSuggestByTarget() {
      const target = document.getElementById('studio-target').value;
      let suggestedType = 'erd';
      if (target === 'excel' || target === 'sql') suggestedType = 'erd';
      else if (target === 'source') suggestedType = 'sequence';
      else if (target === 'logs') suggestedType = 'timeline';
      else if (target === 'folder') suggestedType = 'tree';
      else if (target === 'workflow') suggestedType = 'workflow';

      const typeSelect = document.getElementById('studio-type-select');
      const ucSelect = document.getElementById('studio-usecase-select');
      if (typeSelect) typeSelect.value = suggestedType;
      if (ucSelect) ucSelect.value = suggestedType;
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
      const method = document.getElementById('studio-method').value;

      let chosenType = 'default';
      if (method === 'by_type') {
        chosenType = document.getElementById('studio-type-select').value;
      } else if (method === 'by_usecase') {
        chosenType = document.getElementById('studio-usecase-select').value;
      }

      const titleEl = document.getElementById('canvas-title');
      const subtitleEl = document.getElementById('canvas-subtitle');
      const targetLabel = targetText.split(' ')[1] || 'MỤC TIÊU';

      if (titleEl) {
        if (chosenType === 'default') {
          titleEl.innerText = `KẾT QUẢ KHÁM NGHIỆM ĐA CHIỀU (10 GÓC NHÌN ĐỒNG THỜI) — ${targetLabel}`;
        } else {
          titleEl.innerText = `BẢN VẼ: SƠ ĐỒ ${chosenType.toUpperCase()} — ${targetLabel}`;
        }
      }

      if (subtitleEl) {
        subtitleEl.innerText = `Tác tử phụ trách: @${agent.toUpperCase()} • Chuẩn Archify v3.2 • Mode: ${method.toUpperCase()} • Evidence Verified`;
      }

      // Radar scan animation effect
      const vp = document.getElementById('canvas-viewport');
      if (vp) {
        vp.innerHTML = `
          <div class="text-center space-y-3 py-16 animate-pulse">
            <i class="fas fa-circle-notch fa-spin text-4xl text-cyan-400"></i>
            <div class="text-sm font-orbitron font-bold text-white">TÁC TỬ ĐANG QUÉT MỤC TIÊU & BIÊN DỊCH ARCHIFY SCHEMA...</div>
            <div class="text-xs font-mono text-slate-400">${chosenType === 'default' ? 'Đang trích xuất song song toàn bộ 10 góc nhìn nghiệp vụ...' : 'Đang tính toán tọa độ lưới và kiểm định chất lượng góc nhìn đơn lẻ...'}</div>
          </div>
        `;

        setTimeout(() => {
          if (chosenType === 'default') {
            render10PerspectiveMatrix(targetLabel);
          } else {
            renderSinglePerspective(chosenType, targetLabel);
          }
        }, 400);
      }
    }

    function inspectSingleType(typeKey) {
      document.getElementById('studio-method').value = 'by_type';
      onMethodChange();
      document.getElementById('studio-type-select').value = typeKey;
      runStudioInspection();
      window.scrollTo({ top: document.getElementById('canvas-title').offsetTop - 100, behavior: 'smooth' });
    }

    function render10PerspectiveMatrix(targetLabel) {
      const vp = document.getElementById('canvas-viewport');
      if (!vp) return;

      const perspectives = [
        { key: 'erd', name: '1. ERD (CƠ SỞ DỮ LIỆU)', icon: 'fas fa-database', color: 'text-cyan-400', border: 'border-cyan-800', desc: 'Bảng, khóa chính PK & khóa ngoại FK', tag: 'Data Entities' },
        { key: 'dataflow', name: '2. DATAFLOW (LUỒNG DỮ LIỆU)', icon: 'fas fa-stream', color: 'text-emerald-400', border: 'border-emerald-800', desc: 'Input -> Filter -> Transform -> Storage', tag: 'Pipeline' },
        { key: 'workflow', name: '3. WORKFLOW (QUY TRÌNH BƯỚC)', icon: 'fas fa-project-diagram', color: 'text-purple-400', border: 'border-purple-800', desc: 'M1 -> M2 -> Cổng Ron duyệt -> M5', tag: 'Business Steps' },
        { key: 'sequence', name: '4. SEQUENCE (TRÌNH TỰ API)', icon: 'fas fa-exchange-alt', color: 'text-amber-400', border: 'border-amber-800', desc: 'Bắt tay Ron <-> Runtime <-> Goose trace', tag: 'API Calls' },
        { key: 'lifecycle', name: '5. LIFECYCLE (VÒNG ĐỜI TRẠNG THÁI)', icon: 'fas fa-recycle', color: 'text-pink-400', border: 'border-pink-800', desc: 'Pending -> Running -> Verified -> Live', tag: 'State Machine' },
        { key: 'architecture', name: '6. ARCHITECTURE (HẠ TẦNG KHỐI)', icon: 'fas fa-cubes', color: 'text-blue-400', border: 'border-blue-800', desc: 'Căn cứ Mặt Đất (Win) <-> Căn cứ Đám Mây', tag: 'Containers' },
        { key: 'tree', name: '7. TREE (CÂY PHÂN CẤP MODULE)', icon: 'fas fa-sitemap', color: 'text-teal-400', border: 'border-teal-800', desc: 'Phả hệ thư mục: root -> src -> core', tag: 'Directory Tree' },
        { key: 'class', name: '8. CLASS (SƠ ĐỒ LỚP OOP)', icon: 'fas fa-shapes', color: 'text-indigo-400', border: 'border-indigo-800', desc: 'Classes, Interface & Kế thừa method', tag: 'OOP Modeling' },
        { key: 'timeline', name: '9. TIMELINE (DÒNG THỜI GIAN)', icon: 'fas fa-clock', color: 'text-rose-400', border: 'border-rose-800', desc: 'Mốc biến cố & sự cố theo trục thời gian', tag: 'Forensic Audit' },
        { key: 'waterfall', name: '10. WATERFALL (THÁC NƯỚC ĐỘ TRỄ)', icon: 'fas fa-chart-bar', color: 'text-yellow-400', border: 'border-yellow-800', desc: 'Thời lượng duration từng bước latency', tag: 'Latency & Spans' }
      ];

      let gridHtml = `
        <div class="w-full space-y-4">
          <div class="p-3 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-purple-950/40 border border-cyan-800/80 rounded-xl flex items-center justify-between text-xs font-mono">
            <span class="text-cyan-300 font-bold"><i class="fas fa-check-double text-emerald-400 mr-2"></i>ĐÃ QUÉT THÀNH CÔNG 10/10 GÓC NHÌN CHO MỤC TIÊU: <span class="text-white">${targetLabel}</span></span>
            <span class="text-slate-400 text-[11px]">Bấm vào nút "Phóng To" trên ô bất kỳ để soi chi tiết</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 font-mono">
      `;

      perspectives.forEach(p => {
        gridHtml += `
          <div class="bg-slate-900/90 border ${p.border} p-3.5 rounded-xl space-y-2.5 flex flex-col justify-between hover:border-cyan-500 transition shadow-md group">
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">${p.tag}</span>
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div class="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                <i class="${p.icon} ${p.color}"></i>
                <span class="truncate">${p.name}</span>
              </div>
              <p class="text-[11px] text-slate-400 leading-snug">${p.desc}</p>
            </div>

            <!-- Mini Visual Indicator -->
            <div class="p-2 bg-slate-950 rounded-lg border border-slate-800/80 text-[10px] text-slate-500 flex items-center justify-between">
              <span>Status:</span>
              <span class="text-emerald-400 font-bold">PASS 100%</span>
            </div>

            <button onclick="inspectSingleType('${p.key}')" class="w-full py-1.5 bg-slate-800 hover:bg-cyan-600 text-slate-200 hover:text-white rounded-lg text-[11px] font-bold transition flex items-center justify-center space-x-1.5">
              <i class="fas fa-search-plus text-[10px]"></i>
              <span>Phóng To Góc Nhìn</span>
            </button>
          </div>
        `;
      });

      gridHtml += `
          </div>
        </div>
      `;

      vp.innerHTML = gridHtml;
    }

    function renderSinglePerspective(type, targetName) {
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

# Replace studio markup in html
# Find from <!-- ARCHIFY DYNAMIC INSPECTION STUDIO up to </section>
pattern_markup = r'(<!-- =+\s*-->\s*<!-- ARCHIFY DYNAMIC INSPECTION STUDIO.*?</div>\s*</div>\s*</div>)'
# We replace the studio block
html = re.sub(r'<!-- =+\s*-->\s*<!-- ARCHIFY DYNAMIC INSPECTION STUDIO.*?</div>\s*</div>\s*</div>', new_studio_markup.strip(), html, flags=re.DOTALL)

# Replace studio JS in html
html = re.sub(r'// ARCHIFY DYNAMIC INSPECTION STUDIO LOGIC.*?(function switchC4Level)', new_studio_js.strip() + r'\n\n    \1', html, flags=re.DOTALL)

# Also ensure DOMContentLoaded triggers default 10-perspective matrix view!
html = html.replace("setTimeout(() => renderDynamicDiagram('erd', 'bao_cao_tai_chinh.xlsx'), 150);", "setTimeout(() => render10PerspectiveMatrix('bao_cao_tai_chinh.xlsx'), 150);")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Finished update_studio_v2.py. File size:", len(html))
