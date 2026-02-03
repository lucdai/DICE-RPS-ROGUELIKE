# Dice & RPS Roguelike - Game Design Document

## Tổng Quan Trò Chơi

**Dice & RPS Roguelike** là một trò chơi hành động roguelike kết hợp hai cơ chế chính:
1. **Xúc xắc (Dice)**: Quyết định sức mạnh và số lượt hành động
2. **Kéo Búa Bao (Rock-Paper-Scissors)**: Quyết định kết quả chiến đấu

Người chơi sẽ vượt qua các tầng hầm, chiến đấu với quái vật, thu thập vật phẩm bổ trợ (relics) để nâng cấp khả năng.

---

## Cơ Chế Chiến Đấu

### Vòng Lặp Chiến Đấu (Combat Loop)

1. **Bước 1: Tung Xúc Xắc**
   - Người chơi tung một hoặc nhiều xúc xắc (tùy theo relic)
   - Kết quả: 1-6 điểm sức mạnh (Damage Power)
   - Xúc xắc có thể được tái tung lại (reroll) nếu có relic hỗ trợ

2. **Bước 2: Chọn Kéo Búa Bao**
   - Người chơi chọn: Đá (Rock), Giấy (Paper), hoặc Kéo (Scissors)
   - Quái vật chọn ngẫu nhiên một trong ba lựa chọn

3. **Bước 3: Tính Toán Kết Quả**
   - **Thắng (Win)**: Gây sát thương = Damage Power × 2
   - **Hòa (Draw)**: Gây sát thương = Damage Power × 1
   - **Thua (Lose)**: Bị phản đòn = Damage Power × 0.5 (quái vật gây sát thương)

4. **Bước 4: Quái Vật Phản Công**
   - Nếu quái vật còn sống, nó sẽ phản công
   - Sát thương quái vật = Sức mạnh quái vật × (1 hoặc 2 tùy theo relic của người chơi)

### Hệ Thống Máu (HP)

- **Người chơi**: Bắt đầu với 100 HP
- **Quái vật**: Có HP khác nhau tùy theo loại (1-50 HP)
- Chiến đấu kết thúc khi một bên HP ≤ 0

---

## Hệ Thống Roguelike

### Cấu Trúc Tầng (Floors)

- **Tầng 1-3**: Quái vật yếu (10-20 HP, Sát thương 5-10)
- **Tầng 4-6**: Quái vật trung bình (20-35 HP, Sát thương 10-15)
- **Tầng 7-10**: Quái vật mạnh (30-50 HP, Sát thương 15-25)
- **Boss**: Quái vật cuối cùng (100 HP, Sát thương 20)

### Vật Phẩm Bổ Trợ (Relics)

Sau mỗi chiến đấu thắng, người chơi chọn một trong ba relic ngẫu nhiên:

| Relic | Hiệu Ứng |
|-------|---------|
| **Lucky Dice** | Được tái tung xúc xắc 1 lần mỗi vòng |
| **Double Strike** | Sát thương thắng × 2.5 thay vì × 2 |
| **Armor** | Giảm sát thương nhận được 30% |
| **Regeneration** | Hồi 10 HP sau mỗi chiến đấu thắng |
| **Precision** | Sát thương hòa × 1.5 thay vì × 1 |
| **Reflect** | Phản xạ 50% sát thương nhận được |
| **Extra Dice** | Tung 2 xúc xắc thay vì 1 (cộng kết quả) |
| **Combo** | Nếu thắng 2 lần liên tiếp, sát thương × 1.5 |

---

## Giao Diện & Luồng Chơi

### Màn Hình Chính (Home Screen)
- Nút "Bắt Đầu Trò Chơi"
- Hiển thị cao điểm (High Score)
- Hướng dẫn cơ bản

### Màn Hình Chiến Đấu (Combat Screen)
- **Trái**: Thông tin người chơi (HP, Relics)
- **Giữa**: Xúc xắc, nút tung xúc xắc, nút chọn RPS
- **Phải**: Thông tin quái vật (HP, Tên, Hình ảnh)
- **Dưới**: Lịch sử hành động

### Màn Hình Chọn Relic (Relic Selection Screen)
- Hiển thị 3 relic ngẫu nhiên
- Mô tả chi tiết từng relic
- Nút chọn relic

### Màn Hình Kết Thúc (Game Over Screen)
- Kết quả (Thắng/Thua)
- Số tầng đạt được
- Số điểm (Score)
- Nút "Chơi Lại"

---

## Tính Điểm (Scoring)

- **Mỗi quái vật tiêu diệt**: +10 điểm
- **Mỗi tầng hoàn thành**: +50 điểm
- **Bonus thắng liên tiếp**: +5 điểm × số lần thắng liên tiếp
- **Tổng điểm**: Điểm cơ bản + Bonus

---

## Trạng Thái Trò Chơi

```
[Home] → [Combat] → [Relic Selection] → [Combat] → ... → [Game Over]
```

- Người chơi tiếp tục cho đến khi HP ≤ 0 hoặc hoàn thành 10 tầng (thắng)
- Có thể thoát trò chơi bất cứ lúc nào (lưu cao điểm)
