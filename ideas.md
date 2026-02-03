# Dice & RPS Roguelike - Design Brainstorm

## Phương Pháp 1: Dark Fantasy Dungeon Crawler

**Design Movement**: Dark Fantasy RPG aesthetic (tương tự Hades, Darkest Dungeon)

**Core Principles**:
- Sử dụng màu sắc tối, tạo cảm giác bí ẩn và nguy hiểm
- Các yếu tố trang trí theo phong cách medieval/gothic
- Chuyển động mượt mà, hiệu ứng ánh sáng để tạo sự sống động
- Tập trung vào sự căng thẳng và hành động nhanh

**Color Philosophy**:
- Nền: Đen sâu (#0a0e27) với gradient tím đỏ
- Accent: Vàng/cam (#f59e0b, #dc2626) cho sức mạnh
- Text: Trắng/xám nhạt cho độ tương phản cao
- Lý do: Tạo cảm giác nguy hiểm, kích thích, phù hợp với theme dungeon

**Layout Paradigm**:
- Asymmetric layout: Người chơi bên trái, quái vật bên phải
- Xúc xắc nằm ở giữa dưới, RPS buttons ở dưới cùng
- Relics hiển thị dạng icon ở góc trên phải
- Không dùng grid centered, thay vào đó là diagonal/staggered arrangement

**Signature Elements**:
- Xúc xắc 3D với hiệu ứng glow
- Quái vật với animation idle (呼吸, xoay, nhấp nháy)
- Particle effects khi tấn công (máu, lửa, ánh sáng)
- Ornamental borders với pattern gothic

**Interaction Philosophy**:
- Click/tap tung xúc xắc → animation xoay nhanh, kết quả hiện dần
- Chọn RPS → animation slide-in, quái vật phản ứng ngay lập tức
- Thắng → animation explosion, HP quái vật giảm với hiệu ứng
- Thua → animation knockback, HP người chơi giảm

**Animation**:
- Xúc xắc: Spin 0.5s, settle 0.3s, glow pulse 0.8s
- Quái vật: Idle bob 2s, attack thrust 0.4s, damage shake 0.2s
- Transitions: Fade 0.3s giữa các màn hình
- Relics: Slide-in từ phải, pulse khi được chọn

**Typography System**:
- Display: "Orbitron" (bold, futuristic) cho tiêu đề, tầng số
- Body: "Inter" (regular) cho mô tả, stats
- Hierarchy: H1 (32px bold) → H2 (24px bold) → Body (14px regular)

---

## Phương Pháp 2: Neon Cyberpunk Arcade

**Design Movement**: 80s Arcade + Cyberpunk aesthetic (tương tự Synthwave, tron)

**Core Principles**:
- Neon colors với nền tối, tạo cảm giác retro-futuristic
- Grid lines, scanlines, digital effects
- Chuyển động nhanh, energetic
- Cảm giác "arcade game" cổ điển nhưng hiện đại

**Color Philosophy**:
- Nền: Đen (#000000) với scanlines xanh lá (#00ff00)
- Accent: Hồng (#ff006e), Xanh lam (#00d9ff), Tím (#b537f2)
- Text: Neon xanh lá hoặc hồng
- Lý do: Tạo cảm giác arcade, retro, energetic

**Layout Paradigm**:
- Grid-based với các ô vuông, hexagon
- Người chơi và quái vật ở hai góc đối diện
- Xúc xắc ở trung tâm với border neon
- Relics hiển thị dạng grid 2x2 hoặc 3x3

**Signature Elements**:
- Xúc xắc với texture grid/scanlines
- Quái vật dạng pixel art hoặc wireframe
- Neon borders, glitch effects
- HUD-style text với digital font

**Interaction Philosophy**:
- Click xúc xắc → glitch effect, số hiện lên với neon glow
- Chọn RPS → neon flash, quái vật hiện animation
- Thắng → neon explosion, confetti
- Thua → screen shake, red flash

**Animation**:
- Xúc xắc: Rotate 0.6s với glitch, settle với neon glow
- Quái vật: Idle flicker 1.5s, attack pulse 0.3s
- Transitions: Glitch transition 0.4s
- Relics: Bounce-in từ dưới, glow pulse

**Typography System**:
- Display: "Courier New" hoặc "Roboto Mono" (monospace) cho arcade feel
- Body: "Courier New" (monospace) cho consistency
- Hierarchy: H1 (36px bold) → H2 (24px bold) → Body (12px regular monospace)

---

## Phương Pháp 3: Minimalist Board Game

**Design Movement**: Modern Board Game + Minimalist Design (tương tự Inscryption, Slay the Spire)

**Core Principles**:
- Thiết kế sạch sẽ, không quá trang trí
- Tập trung vào gameplay mechanics
- Sử dụng whitespace hiệu quả
- Màu sắc hạn chế nhưng có ý nghĩa

**Color Philosophy**:
- Nền: Trắng (#ffffff) hoặc xám nhạt (#f5f5f5)
- Accent: Xanh đậm (#1e40af), Đỏ (#dc2626), Vàng (#f59e0b)
- Text: Đen (#000000) hoặc xám đậm (#374151)
- Lý do: Tạo cảm giác board game, dễ đọc, chuyên nghiệp

**Layout Paradigm**:
- Centered layout với card-based design
- Người chơi card ở dưới, quái vật card ở trên
- Xúc xắc ở giữa dưới, RPS buttons ở dưới cùng
- Relics hiển thị dạng card row ở phía bên

**Signature Elements**:
- Xúc xắc dạng card với số lớn
- Quái vật dạng card với artwork minimalist
- Borders và shadows mềm mại
- Typography bold, rõ ràng

**Interaction Philosophy**:
- Click xúc xắc → animation flip, số hiện lên
- Chọn RPS → card slide-in, kết quả hiện dần
- Thắng → card scale-up, confetti nhẹ
- Thua → card fade-out, HP giảm

**Animation**:
- Xúc xắc: Flip 0.5s, settle với shadow
- Quái vật: Subtle scale pulse 1.5s, attack slide 0.3s
- Transitions: Fade 0.3s, slide 0.4s
- Relics: Slide-in từ trái, subtle glow

**Typography System**:
- Display: "Playfair Display" (serif, elegant) cho tiêu đề
- Body: "Inter" (sans-serif) cho body text
- Hierarchy: H1 (40px bold serif) → H2 (28px bold serif) → Body (14px regular sans-serif)

---

## Lựa Chọn Cuối Cùng

**Tôi chọn Phương Pháp 1: Dark Fantasy Dungeon Crawler**

Lý do:
- Phù hợp nhất với theme Roguelike
- Tạo cảm giác immersive và hấp dẫn
- Các hiệu ứng animation sẽ làm trò chơi sinh động
- Màu sắc tối tạo sự tập trung vào gameplay
- Asymmetric layout tạo sự động lực trong giao diện

Các quyết định thiết kế cụ thể:
- Nền gradient tím-đỏ tạo cảm giác fantasy
- Xúc xắc 3D với glow effect
- Quái vật có animation idle
- Particle effects cho mỗi hành động
- Typography: Orbitron + Inter
- Asymmetric layout với người chơi bên trái, quái vật bên phải
