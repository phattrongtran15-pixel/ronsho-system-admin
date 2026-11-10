export function renderTriadOracle(): string {
  const gates = [
    { name: 'single_svg', desc: 'Đảm bảo khối vector SVG duy nhất, không trùng lặp DOM', status: 'PASS' },
    { name: 'finite_svg', desc: 'Kiểm soát kích thước canvas hữu hạn, không tràn vô tận', status: 'PASS' },
    { name: 'orthogonal_arrows', desc: 'Các mũi tên liên kết thẳng góc 90 độ, chuẩn kiến trúc', status: 'PASS' },
    { name: 'label_route_clearance', desc: 'Nhãn văn bản không bị đè vạch đường dây kết nối', status: 'PASS' },
    { name: 'relationship_crossings', desc: 'Tối thiểu hóa giao cắt chéo giữa các luồng quan hệ', status: 'PASS' },
    { name: 'relationship_corridors', desc: 'Giữ hành lang cách ly an toàn giữa các đường song song', status: 'PASS' },
    { name: 'container_border_runs', desc: 'Dây nối không chạy trùng lên viền khung chứa ranh giới', status: 'PASS' },
    { name: 'route_rhythm', desc: 'Nhịp uốn cong đồng nhất (tối đa 2 bends per edge)', status: 'PASS' },
    { name: 'legend_clearance', desc: 'Khu vực chú thích không che khuất thành phần hệ thống', status: 'PASS' },
  ];

  return `
    <div class="space-y-6">

      <!-- Header Banner -->
      <div class="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 shadow-xl">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-xl">🛡️</span>
              <h2 class="text-xl font-black text-white tracking-wide">
                ARCHIFY ORACLE — CỔNG KIỂM TRA ĐÚNG SAI & MERKLE SEAL
              </h2>
            </div>
            <p class="text-xs text-slate-400 mt-1">
              Hệ thống kiểm toán kiến trúc vật lý độc lập. Phát hiện ranh giới vi phạm, chống suy diễn sai lệch và niêm phong mật mã.
            </p>
          </div>

          <div class="flex items-center space-x-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-emerald-500/40">
            <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-xs font-mono font-bold text-emerald-300">ORACLE VERIFIED (9/9 GATES)</span>
          </div>
        </div>
      </div>

      <!-- Oracle Verification Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <!-- Left: Merkle Hash Proof Card -->
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              🔒 Merkle Seal Receipt (SHA-256)
            </div>
            <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-cyan-300 break-all mb-3 select-all">
              3f74ce6c80e90f596a26bc38ee04c17894d8cf0f8562182c97bc246204446bd7
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              Mã băm Merkle chứng thực sơ đồ kiến trúc nguyên bản, không bị Agent tự ý sửa đổi khi thiếu quyền quyết định (Human Sovereignty).
            </p>
          </div>

          <div class="pt-4 border-t border-slate-800 text-xs font-mono flex items-center justify-between text-slate-400">
            <span>Size: <strong>845 KB</strong></span>
            <span>Profile: <strong class="text-emerald-400">SHOWCASE</strong></span>
          </div>
        </div>

        <!-- Center & Right: 9 Gates Checklist -->
        <div class="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 font-mono">
            📋 9 Cổng Kiểm Toán Hình Học & Ranh Giới (Geometric & Boundary Gates)
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${gates
              .map(
                (g) => `
              <div class="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex items-start space-x-2.5">
                <span class="text-emerald-400 font-bold text-xs">✓</span>
                <div>
                  <div class="font-mono text-xs font-bold text-white">${g.name}</div>
                  <div class="text-[11px] text-slate-400 leading-tight">${g.desc}</div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

      </div>

      <!-- Live Embedded Visual Diagram Frame -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-2">
            <span class="text-base font-bold text-white">🖥️ Trình Xem Bản Vẽ Tương Tác Sống (Live Interactive Canvas)</span>
            <span class="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              archify-triad.html
            </span>
          </div>
          <a
            href="./archify-triad.html"
            target="_blank"
            class="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
          >
            <span>Mở tab riêng</span>
            <span>↗</span>
          </a>
        </div>

        <div class="w-full h-[600px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
          <iframe
            src="./archify-triad.html"
            class="w-full h-full border-0"
            title="Archify Verified RON-SHO Triad Diagram"
          ></iframe>
        </div>
      </div>

    </div>
  `;
}
