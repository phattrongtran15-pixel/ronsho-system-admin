# 🚀 RONSHO AIOS — System Management & Multi-Agent Operations Control Center

[![CI Verification](https://github.com/phattrongtran15-pixel/ronsho-system-admin/actions/workflows/ci.yml/badge.svg)](https://github.com/phattrongtran15-pixel/ronsho-system-admin/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Fleet: 4 Agents](https://img.shields.io/badge/Fleet-4%20Active%20Agents-brightgreen.svg)]()
[![Circuit Breaker](https://img.shields.io/badge/Circuit%20Breaker-100%25%20Armed-cyan.svg)]()

> **Hệ thống điều phối trung tâm (Mission Control & Admin Operations)** thuộc hệ sinh thái **RON-SHO AIOS** do Thuyền trưởng Ron (`phattrongtran15-pixel`) chỉ huy. Tích hợp chuyển đổi chế độ kép giữa **Mẫu 3: Cyberpunk AI Agent Mission Control HUD** và **Mẫu 1: Enterprise Admin Dashboard (Shadcn style)**.

---

## 🌐 Trải nghiệm Trực tiếp (Live Demo)

* 🔗 **GitHub Pages:** [https://phattrongtran15-pixel.github.io/ronsho-system-admin/](https://phattrongtran15-pixel.github.io/ronsho-system-admin/)
* 📦 **Mã nguồn:** [https://github.com/phattrongtran15-pixel/ronsho-system-admin](https://github.com/phattrongtran15-pixel/ronsho-system-admin)

---

## ⚡ Các Tính Năng Trọng Tâm

### 1. 🛸 Mẫu 3: Cyberpunk AI Agent Mission Control HUD
- **Giám sát hạm đội A2A thời gian thực:**
  - `RON RUNTIME` (Master Orchestrator / A2A Protocol / ONLINE)
  - `GOOSE HEADLESS` (Free Router Worker / OpenRouter Nemotron 3.5 / WORKING)
  - `KILO BUILDER` (Căn cứ mặt đất Windows / Local Ollama qwen3 / STANDBY)
  - `ANTI CLOUD` (Cloud Architect & QA Oracle / ACTIVE)
- **Cầu dao chống cháy Quota (Circuit Breaker HUD):**
  - Hiển thị ngân sách token ($0.00 trên OpenRouter Free Tier).
  - Khóa chống tham lam (Anti-Greedy Fallback).
  - Cắt lỗ tối đa 2 lần, ngăn chặn triệt để loop sửa lỗi vô hạn trong đêm.
  - Tuân thủ Rule 5: Zero Silent Halt (Bắt buộc phát cảnh báo thị giác `🚨 [HAVE ISSUE]`).
- **Telemetry Log Stream:** Dòng log tự động cập nhật sự kiện thời gian thực.

### 2. 💼 Mẫu 1: Enterprise Admin Dashboard (Shadcn UI Style)
- Bảng tổng kết số liệu KPIs (Tổng tác vụ, độ chính xác bàn giao handoff, ngân sách tiết kiệm).
- Bảng dữ liệu tác vụ (Data Table) theo dõi các vé công việc (`TKT-A2A-071`, `TKT-BRN-179`, `TKT-MCP-001`).
- Tìm kiếm, lọc và xuất báo cáo vận hành.

---

## 🛠️ Cài Đặt & Chạy Cục Bộ

### Chạy nhanh (Zero Configuration)
Mở trực tiếp file `index.html` bằng bất kỳ trình duyệt nào trên Windows, macOS hoặc Linux. Không cần cài đặt bất kỳ dependency nào.

### Chạy với Node / Vite
```bash
# Cài đặt
pnpm install # hoặc npm install

# Chạy môi trường phát triển
pnpm dev

# Chạy kiểm thử tự động
npm test

# Đóng gói xuất xưởng
pnpm build
```

---

## 📜 Kỷ Luật & Triết Lý Vận Hành (Ron-Sho Standard)
- **Human Sovereignty:** Quyền quyết định tối cao thuộc về Thuyền trưởng Ron.
- **Evidence Before Claims:**
  - `UNKNOWN != PASS`
  - `FILE EXISTS != WORKS`
  - `EXECUTED != VERIFIED != ACCEPTED`
- **Zero Copy-Paste:** Không biến Ron thành middleware trung chuyển mã nguồn.

---

## 📄 Bản Quyền
Phát hành theo giấy phép [MIT License](LICENSE). Bản quyền thuộc về **Thuyền trưởng Ron (`phattrongtran15-pixel`)**.
