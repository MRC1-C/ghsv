SimulatorWorld
=== 

![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)

Abstract
===

Thuật toán mang ý tưởng về sự phát triển của bầy đàn trong tự nhiên, Khi áp dụng vào các bài toán cụ thể em mong thuật toán sẽ học được một mạng deeplearning phù hợp nhất với bài toán đó. Hiện tại em đang phát triển 1 thuật toán dựa trên bầy ong và tương lai là nhiều bầy đàn khác

Introduction
===

Hiện nay việc chọn ra một mạng hợp lý cho một bài toán cần sự kinh nghiệm của một người lập trình và train nhiều model, chỉnh nhiều tham số để chọn ra một model thích hợp nhất cho bài toán. Em muốn tạo ra một thuật toán mà ở đó mạng có thể tự tiến hóa và phát triển

SimulatorWorld
===

## SimulatorBee
### B
### Data
Data sách và đã cân bằng dữ liệu
![](https://i.imgur.com/aGRZwvT.png)
### Ý tưởng bài toán
Bầy ong gồm ong chúa, ong đực và ong thợ
Ong đực chỉ có vai trò thụ tinh nên em loại ong này
Ong thợ em chia thành hai loại ong thợ làm mật ong và ong thợ kiếm thức ăn em đặt tên lần lượt là ong thợ X và ong thợ Y
Em định nghĩa data đã gán nhãn là mật ong và data chưa gán nhãn là phấn hoa

* Ong chúa:có vai trò sinh ra các model ong thợ con, và dùng mật ong làm data để train ong thợ
* Ong thợ Y: có vài trò lên internet kiếm phấn hoa (data thô)
* Ong thợ X: có vai trò biến phấn hoa thành mật ong( làm giàu dữ liệu ), có n ong thợ X mỗi con sẽ có k năng lượng. Khi ong thợ Y kiếm phấn hoa( dữ liệu thô ) về thì n ong thợ X này sẽ dự đoán các dữ liệu thô này nếu có 90% số ong thợ X có cùng kết quả thì lấy kết quả đó thêm vào dữ liệu ban đầu, và các con ong dự đoán đúng thì sẽ được thưởng hoặc phạt một khoảng h(hàm h sẽ được tính dựa trên số data được công nhận và parameter của model) năng lượng, nếu k <= 0 thì ong đó sẽ chết, gen con ong có năng lượng cao nhất sẽ được làm gen cơ bản cho lần sinh sản sau  

Vòng đời tổ ong (em đang phát triển ong chúa và ong thợ X và coi như data thô đã có không cần ong thợ Y kiếm)
1. Khởi tạo bầy: Ban đầu ong chúa sẽ sinh ngẫu nhiên n ong thợ X, và dùng dữ liệu ban đầu train ep1 epoch
2. Xây dựng tổ: Các ong thợ X làm giàu dữ liệu bằng cách này (Vì phần cứng chưa cho phép nên em code em đang bỏ qua bước này)
3. Sinh sản: Ong chúa sẽ dùng gen ong thợ X có độ chính xác cao nhất để sinh ra n* ong thợ X kế tiếp với mức đột biến là 100% với phương pháp đột biến là thêm 1 lớp mạng cơ bản và 1 cách nối mạng, ong thợ X con vừa được sinh ra sẽ được kế thừa trọng số và sẽ được train ep2 epoch nữa
4. Sinh tồn: Chọn ra n ong thợ trong n + n* ong thợ X dựa độ chính xác trên tập test và quay lại bước thứ 2 hoặc đến khi hội tụ thì dừng thật toán  
### Mô tả
#### Ví dụ mạng
['C','R','C','R']
['+','-','-']
Ký hiệu  | Giải thích
------------- | -------------
C  | Mạng CNN cơ bản(dim: 32, kerner: 3x3, pading: 1, stride: 1)
R  | Mạng RNN cơ bản( h0 size(2,batchsize,1024/2)
"+"| cộng 2 mạng 
"-"| nối 2 mạng

![](https://i.imgur.com/yUBym0w.png)
### Kết quả
Chọn tham số: n=4, ep1 = 5, n* =4, ep2 =3

Bat dau tao quan the
con 140484275768192 voi gen ['C', 'C'] va mode ['-']
con 140484275768288 voi gen ['C', 'C'] va mode ['+']
con 140484272959648 voi gen ['R', 'C'] va mode ['-']
con 140484272960176 voi gen ['C', 'C'] va mode ['-']
train quan the ban dau
train voi 5 epoch
Con 140484275768192 Epoch 1 
-------------------------------
loss: 2.300926  [    0/60000]
loss: 2.112245  [ 6400/60000]
loss: 2.029023  [12800/60000]
loss: 1.913427  [19200/60000]
loss: 1.862423  [25600/60000]
loss: 1.850035  [32000/60000]
loss: 1.790923  [38400/60000]
loss: 1.837264  [44800/60000]
loss: 1.804361  [51200/60000]
loss: 1.769317  [57600/60000]
Test Error: 
 Accuracy: 83.4%, Avg loss: 1.757147 

Con 140484275768192 Epoch 2 
-------------------------------
loss: 1.764357  [    0/60000]
loss: 1.733890  [ 6400/60000]
loss: 1.743353  [12800/60000]
loss: 1.723003  [19200/60000]
loss: 1.708794  [25600/60000]
loss: 1.720043  [32000/60000]
loss: 1.679540  [38400/60000]
loss: 1.734471  [44800/60000]
loss: 1.724476  [51200/60000]
loss: 1.696155  [57600/60000]
Test Error: 
 Accuracy: 85.7%, Avg loss: 1.688496 

Con 140484275768192 Epoch 3 
-------------------------------
loss: 1.691566  [    0/60000]
loss: 1.671942  [ 6400/60000]
loss: 1.683100  [12800/60000]
loss: 1.676295  [19200/60000]
loss: 1.665640  [25600/60000]
loss: 1.682064  [32000/60000]
loss: 1.642972  [38400/60000]
loss: 1.694145  [44800/60000]
loss: 1.692040  [51200/60000]
loss: 1.664604  [57600/60000]
Test Error: 
 Accuracy: 86.8%, Avg loss: 1.657756 

Con 140484275768192 Epoch 4 
-------------------------------
loss: 1.655466  [    0/60000]
loss: 1.642627  [ 6400/60000]
loss: 1.653160  [12800/60000]
loss: 1.652938  [19200/60000]
loss: 1.641585  [25600/60000]
loss: 1.663555  [32000/60000]
loss: 1.623694  [38400/60000]
loss: 1.671352  [44800/60000]
loss: 1.673046  [51200/60000]
loss: 1.646029  [57600/60000]
Test Error: 
 Accuracy: 87.6%, Avg loss: 1.639152 

Con 140484275768192 Epoch 5 
-------------------------------
loss: 1.631815  [    0/60000]
loss: 1.624781  [ 6400/60000]
loss: 1.633952  [12800/60000]
loss: 1.638462  [19200/60000]
loss: 1.625088  [25600/60000]
loss: 1.652361  [32000/60000]
loss: 1.611359  [38400/60000]
loss: 1.656427  [44800/60000]
loss: 1.660040  [51200/60000]
loss: 1.633590  [57600/60000]
Test Error: 
 Accuracy: 88.1%, Avg loss: 1.626341 

Con 140484275768192 enery 88.1118240577808
Con 140484275768288 Epoch 1 
-------------------------------
loss: 2.311464  [    0/60000]
loss: 2.131727  [ 6400/60000]
loss: 2.055762  [12800/60000]
loss: 1.936160  [19200/60000]
loss: 1.883985  [25600/60000]
loss: 1.867232  [32000/60000]
loss: 1.805251  [38400/60000]
loss: 1.852407  [44800/60000]
loss: 1.815770  [51200/60000]
loss: 1.777761  [57600/60000]
Test Error: 
 Accuracy: 83.4%, Avg loss: 1.767587 

Con 140484275768288 Epoch 2 
-------------------------------
loss: 1.776540  [    0/60000]
loss: 1.741908  [ 6400/60000]
loss: 1.754022  [12800/60000]
loss: 1.731063  [19200/60000]
loss: 1.716855  [25600/60000]
loss: 1.726704  [32000/60000]
loss: 1.685688  [38400/60000]
loss: 1.740990  [44800/60000]
loss: 1.729940  [51200/60000]
loss: 1.700482  [57600/60000]
Test Error: 
 Accuracy: 85.5%, Avg loss: 1.693908 

Con 140484275768288 Epoch 3 
-------------------------------
loss: 1.699157  [    0/60000]
loss: 1.676011  [ 6400/60000]
loss: 1.688971  [12800/60000]
loss: 1.680510  [19200/60000]
loss: 1.670628  [25600/60000]
loss: 1.685794  [32000/60000]
loss: 1.646518  [38400/60000]
loss: 1.698034  [44800/60000]
loss: 1.695481  [51200/60000]
loss: 1.667238  [57600/60000]
Test Error: 
 Accuracy: 86.7%, Avg loss: 1.661320 

Con 140484275768288 Epoch 4 
-------------------------------
loss: 1.661289  [    0/60000]
loss: 1.645175  [ 6400/60000]
loss: 1.657283  [12800/60000]
loss: 1.655665  [19200/60000]
loss: 1.645354  [25600/60000]
loss: 1.666004  [32000/60000]
loss: 1.626050  [38400/60000]
loss: 1.674019  [44800/60000]
loss: 1.675545  [51200/60000]
loss: 1.647646  [57600/60000]
Test Error: 
 Accuracy: 87.6%, Avg loss: 1.641771 

Con 140484275768288 Epoch 5 
-------------------------------
loss: 1.636572  [    0/60000]
loss: 1.626534  [ 6400/60000]
loss: 1.637156  [12800/60000]
loss: 1.640436  [19200/60000]
loss: 1.628214  [25600/60000]
loss: 1.654100  [32000/60000]
loss: 1.613071  [38400/60000]
loss: 1.658376  [44800/60000]
loss: 1.661947  [51200/60000]
loss: 1.634483  [57600/60000]
Test Error: 
 Accuracy: 88.1%, Avg loss: 1.628388 

Con 140484275768288 enery 88.15182405778079
Con 140484272959648 Epoch 1 
-------------------------------
loss: 2.314628  [    0/60000]
loss: 2.156039  [ 6400/60000]
loss: 2.085438  [12800/60000]
loss: 1.969997  [19200/60000]
loss: 1.911150  [25600/60000]
loss: 1.895716  [32000/60000]
loss: 1.833994  [38400/60000]
loss: 1.877576  [44800/60000]
loss: 1.832875  [51200/60000]
loss: 1.800323  [57600/60000]
Test Error: 
 Accuracy: 83.1%, Avg loss: 1.784765 

Con 140484272959648 Epoch 2 
-------------------------------
loss: 1.792522  [    0/60000]
loss: 1.758346  [ 6400/60000]
loss: 1.770153  [12800/60000]
loss: 1.745436  [19200/60000]
loss: 1.725744  [25600/60000]
loss: 1.738789  [32000/60000]
loss: 1.698724  [38400/60000]
loss: 1.755878  [44800/60000]
loss: 1.738197  [51200/60000]
loss: 1.713810  [57600/60000]
Test Error: 
 Accuracy: 85.3%, Avg loss: 1.703262 

Con 140484272959648 Epoch 3 
-------------------------------
loss: 1.708277  [    0/60000]
loss: 1.685728  [ 6400/60000]
loss: 1.698440  [12800/60000]
loss: 1.689454  [19200/60000]
loss: 1.676023  [25600/60000]
loss: 1.693060  [32000/60000]
loss: 1.654840  [38400/60000]
loss: 1.708750  [44800/60000]
loss: 1.700631  [51200/60000]
loss: 1.677214  [57600/60000]
Test Error: 
 Accuracy: 86.5%, Avg loss: 1.667942 

Con 140484272959648 Epoch 4 
-------------------------------
loss: 1.668206  [    0/60000]
loss: 1.652248  [ 6400/60000]
loss: 1.664252  [12800/60000]
loss: 1.662310  [19200/60000]
loss: 1.649601  [25600/60000]
loss: 1.671213  [32000/60000]
loss: 1.632218  [38400/60000]
loss: 1.682414  [44800/60000]
loss: 1.679251  [51200/60000]
loss: 1.655837  [57600/60000]
Test Error: 
 Accuracy: 87.3%, Avg loss: 1.647000 

Con 140484272959648 Epoch 5 
-------------------------------
loss: 1.642350  [    0/60000]
loss: 1.632006  [ 6400/60000]
loss: 1.642850  [12800/60000]
loss: 1.645695  [19200/60000]
loss: 1.631897  [25600/60000]
loss: 1.658363  [32000/60000]
loss: 1.618024  [38400/60000]
loss: 1.665282  [44800/60000]
loss: 1.664796  [51200/60000]
loss: 1.641497  [57600/60000]
Test Error: 
 Accuracy: 88.0%, Avg loss: 1.632738 

Con 140484272959648 enery 88.00077653950878
Con 140484272960176 Epoch 1 
-------------------------------
loss: 2.304734  [    0/60000]
loss: 2.178573  [ 6400/60000]
loss: 2.116709  [12800/60000]
loss: 2.005955  [19200/60000]
loss: 1.945442  [25600/60000]
loss: 1.920187  [32000/60000]
loss: 1.859301  [38400/60000]
loss: 1.897535  [44800/60000]
loss: 1.857151  [51200/60000]
loss: 1.813082  [57600/60000]
Test Error: 
 Accuracy: 82.4%, Avg loss: 1.802439 

Con 140484272960176 Epoch 2 
-------------------------------
loss: 1.811665  [    0/60000]
loss: 1.774855  [ 6400/60000]
loss: 1.786324  [12800/60000]
loss: 1.761050  [19200/60000]
loss: 1.740436  [25600/60000]
loss: 1.746987  [32000/60000]
loss: 1.708985  [38400/60000]
loss: 1.762720  [44800/60000]
loss: 1.751134  [51200/60000]
loss: 1.717292  [57600/60000]
Test Error: 
 Accuracy: 84.9%, Avg loss: 1.711859 

Con 140484272960176 Epoch 3 
-------------------------------
loss: 1.719488  [    0/60000]
loss: 1.693883  [ 6400/60000]
loss: 1.706654  [12800/60000]
loss: 1.698921  [19200/60000]
loss: 1.684947  [25600/60000]
loss: 1.696252  [32000/60000]
loss: 1.660662  [38400/60000]
loss: 1.711203  [44800/60000]
loss: 1.709744  [51200/60000]
loss: 1.677771  [57600/60000]
Test Error: 
 Accuracy: 86.1%, Avg loss: 1.673441 

Con 140484272960176 Epoch 4 
-------------------------------
loss: 1.676548  [    0/60000]
loss: 1.657287  [ 6400/60000]
loss: 1.669839  [12800/60000]
loss: 1.669253  [19200/60000]
loss: 1.655972  [25600/60000]
loss: 1.672343  [32000/60000]
loss: 1.636271  [38400/60000]
loss: 1.682893  [44800/60000]
loss: 1.686686  [51200/60000]
loss: 1.655153  [57600/60000]
Test Error: 
 Accuracy: 87.0%, Avg loss: 1.650986 

Con 140484272960176 Epoch 5 
-------------------------------
loss: 1.649125  [    0/60000]
loss: 1.635382  [ 6400/60000]
loss: 1.647136  [12800/60000]
loss: 1.651202  [19200/60000]
loss: 1.636717  [25600/60000]
loss: 1.658491  [32000/60000]
loss: 1.621183  [38400/60000]
loss: 1.664682  [44800/60000]
loss: 1.671259  [51200/60000]
loss: 1.640188  [57600/60000]
Test Error: 
 Accuracy: 87.7%, Avg loss: 1.635812 

Con 140484272960176 enery 87.6618240577808
sap xep quan the theo energy
loai bo 1 so ca the yeu duoi
Sinh con lan thu 1
con duoc sinh 140484272961664 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['+']
con duoc sinh 140484275768240 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['-']
con duoc sinh 140484272963296 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['+']
con duoc sinh 140484091812928 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'R'] va mode ['-']
train voi 3 epoch
Con 140484275768288 Epoch 1 
-------------------------------
loss: 1.618694  [    0/60000]
loss: 1.613910  [ 6400/60000]
loss: 1.622848  [12800/60000]
loss: 1.630146  [19200/60000]
loss: 1.615513  [25600/60000]
loss: 1.645900  [32000/60000]
loss: 1.603880  [38400/60000]
loss: 1.647274  [44800/60000]
loss: 1.651902  [51200/60000]
loss: 1.625003  [57600/60000]
Test Error: 
 Accuracy: 88.5%, Avg loss: 1.618529 

Con 140484275768288 Epoch 2 
-------------------------------
loss: 1.605103  [    0/60000]
loss: 1.604758  [ 6400/60000]
loss: 1.612046  [12800/60000]
loss: 1.622781  [19200/60000]
loss: 1.605728  [25600/60000]
loss: 1.639782  [32000/60000]
loss: 1.596890  [38400/60000]
loss: 1.638955  [44800/60000]
loss: 1.644117  [51200/60000]
loss: 1.617870  [57600/60000]
Test Error: 
 Accuracy: 88.8%, Avg loss: 1.610912 

Con 140484275768288 Epoch 3 
-------------------------------
loss: 1.594428  [    0/60000]
loss: 1.597803  [ 6400/60000]
loss: 1.603557  [12800/60000]
loss: 1.617260  [19200/60000]
loss: 1.598024  [25600/60000]
loss: 1.634992  [32000/60000]
loss: 1.591310  [38400/60000]
loss: 1.632476  [44800/60000]
loss: 1.637876  [51200/60000]
loss: 1.612330  [57600/60000]
Test Error: 
 Accuracy: 89.0%, Avg loss: 1.604824 

Con 140484275768288 enery 88.98279008140683
Con 140484275768192 Epoch 1 
-------------------------------
loss: 1.614700  [    0/60000]
loss: 1.612627  [ 6400/60000]
loss: 1.620238  [12800/60000]
loss: 1.628638  [19200/60000]
loss: 1.612813  [25600/60000]
loss: 1.644636  [32000/60000]
loss: 1.602546  [38400/60000]
loss: 1.645803  [44800/60000]
loss: 1.650423  [51200/60000]
loss: 1.624661  [57600/60000]
Test Error: 
 Accuracy: 88.6%, Avg loss: 1.616864 

Con 140484275768192 Epoch 2 
-------------------------------
loss: 1.601690  [    0/60000]
loss: 1.603777  [ 6400/60000]
loss: 1.609857  [12800/60000]
loss: 1.621583  [19200/60000]
loss: 1.603348  [25600/60000]
loss: 1.638867  [32000/60000]
loss: 1.595793  [38400/60000]
loss: 1.637820  [44800/60000]
loss: 1.642962  [51200/60000]
loss: 1.617954  [57600/60000]
Test Error: 
 Accuracy: 88.9%, Avg loss: 1.609520 

Con 140484275768192 Epoch 3 
-------------------------------
loss: 1.591468  [    0/60000]
loss: 1.597031  [ 6400/60000]
loss: 1.601683  [12800/60000]
loss: 1.616274  [19200/60000]
loss: 1.595901  [25600/60000]
loss: 1.634337  [32000/60000]
loss: 1.590373  [38400/60000]
loss: 1.631589  [44800/60000]
loss: 1.636967  [51200/60000]
loss: 1.612747  [57600/60000]
Test Error: 
 Accuracy: 89.1%, Avg loss: 1.603634 

Con 140484275768192 enery 89.09279008140683
Con 140484272959648 Epoch 1 
-------------------------------
loss: 1.623616  [    0/60000]
loss: 1.618260  [ 6400/60000]
loss: 1.627729  [12800/60000]
loss: 1.634406  [19200/60000]
loss: 1.618783  [25600/60000]
loss: 1.649698  [32000/60000]
loss: 1.608058  [38400/60000]
loss: 1.653151  [44800/60000]
loss: 1.654146  [51200/60000]
loss: 1.631166  [57600/60000]
Test Error: 
 Accuracy: 88.4%, Avg loss: 1.622255 

Con 140484272959648 Epoch 2 
-------------------------------
loss: 1.609314  [    0/60000]
loss: 1.608284  [ 6400/60000]
loss: 1.616335  [12800/60000]
loss: 1.626304  [19200/60000]
loss: 1.608616  [25600/60000]
loss: 1.643312  [32000/60000]
loss: 1.600529  [38400/60000]
loss: 1.644068  [44800/60000]
loss: 1.645908  [51200/60000]
loss: 1.623391  [57600/60000]
Test Error: 
 Accuracy: 88.6%, Avg loss: 1.614165 

Con 140484272959648 Epoch 3 
-------------------------------
loss: 1.598044  [    0/60000]
loss: 1.600716  [ 6400/60000]
loss: 1.607392  [12800/60000]
loss: 1.620239  [19200/60000]
loss: 1.600552  [25600/60000]
loss: 1.638341  [32000/60000]
loss: 1.594550  [38400/60000]
loss: 1.636990  [44800/60000]
loss: 1.639318  [51200/60000]
loss: 1.617351  [57600/60000]
Test Error: 
 Accuracy: 88.9%, Avg loss: 1.607703 

Con 140484272959648 enery 88.87118779595029
Con 140484272961664 Epoch 1 
-------------------------------
loss: 2.300495  [    0/60000]
loss: 2.185667  [ 6400/60000]
loss: 2.127200  [12800/60000]
loss: 2.019231  [19200/60000]
loss: 1.961485  [25600/60000]
loss: 1.937564  [32000/60000]
loss: 1.872097  [38400/60000]
loss: 1.914590  [44800/60000]
loss: 1.865761  [51200/60000]
loss: 1.827742  [57600/60000]
Test Error: 
 Accuracy: 82.3%, Avg loss: 1.812179 

Con 140484272961664 Epoch 2 
-------------------------------
loss: 1.820615  [    0/60000]
loss: 1.785225  [ 6400/60000]
loss: 1.794789  [12800/60000]
loss: 1.768529  [19200/60000]
loss: 1.746518  [25600/60000]
loss: 1.755799  [32000/60000]
loss: 1.714094  [38400/60000]
loss: 1.772584  [44800/60000]
loss: 1.755024  [51200/60000]
loss: 1.725963  [57600/60000]
Test Error: 
 Accuracy: 84.7%, Avg loss: 1.716776 

Con 140484272961664 Epoch 3 
-------------------------------
loss: 1.723326  [    0/60000]
loss: 1.699827  [ 6400/60000]
loss: 1.710894  [12800/60000]
loss: 1.702612  [19200/60000]
loss: 1.688434  [25600/60000]
loss: 1.701770  [32000/60000]
loss: 1.663238  [38400/60000]
loss: 1.718146  [44800/60000]
loss: 1.711861  [51200/60000]
loss: 1.684084  [57600/60000]
Test Error: 
 Accuracy: 86.0%, Avg loss: 1.676762 

Con 140484272961664 enery 86.03198617996331
Con 140484275768240 Epoch 1 
-------------------------------
loss: 2.310360  [    0/60000]
loss: 2.127374  [ 6400/60000]
loss: 2.044883  [12800/60000]
loss: 1.933213  [19200/60000]
loss: 1.876133  [25600/60000]
loss: 1.859726  [32000/60000]
loss: 1.798519  [38400/60000]
loss: 1.848180  [44800/60000]
loss: 1.809948  [51200/60000]
loss: 1.776862  [57600/60000]
Test Error: 
 Accuracy: 83.1%, Avg loss: 1.763245 

Con 140484275768240 Epoch 2 
-------------------------------
loss: 1.770017  [    0/60000]
loss: 1.740103  [ 6400/60000]
loss: 1.751947  [12800/60000]
loss: 1.731207  [19200/60000]
loss: 1.714722  [25600/60000]
loss: 1.724519  [32000/60000]
loss: 1.684138  [38400/60000]
loss: 1.741037  [44800/60000]
loss: 1.727748  [51200/60000]
loss: 1.702432  [57600/60000]
Test Error: 
 Accuracy: 85.3%, Avg loss: 1.692350 

Con 140484275768240 Epoch 3 
-------------------------------
loss: 1.694910  [    0/60000]
loss: 1.676348  [ 6400/60000]
loss: 1.688792  [12800/60000]
loss: 1.681944  [19200/60000]
loss: 1.669708  [25600/60000]
loss: 1.684814  [32000/60000]
loss: 1.646185  [38400/60000]
loss: 1.698617  [44800/60000]
loss: 1.694313  [51200/60000]
loss: 1.670059  [57600/60000]
Test Error: 
 Accuracy: 86.7%, Avg loss: 1.660635 

Con 140484275768240 enery 86.65198617996332
Con 140484272963296 Epoch 1 
-------------------------------
loss: 2.303802  [    0/60000]
loss: 2.233824  [ 6400/60000]
loss: 2.188918  [12800/60000]
loss: 2.113549  [19200/60000]
loss: 2.068128  [25600/60000]
loss: 2.038738  [32000/60000]
loss: 1.972666  [38400/60000]
loss: 1.998567  [44800/60000]
loss: 1.945985  [51200/60000]
loss: 1.905517  [57600/60000]
Test Error: 
 Accuracy: 81.5%, Avg loss: 1.884778 

Con 140484272963296 Epoch 2 
-------------------------------
loss: 1.892515  [    0/60000]
loss: 1.852800  [ 6400/60000]
loss: 1.854836  [12800/60000]
loss: 1.818865  [19200/60000]
loss: 1.794341  [25600/60000]
loss: 1.800879  [32000/60000]
loss: 1.755710  [38400/60000]
loss: 1.811874  [44800/60000]
loss: 1.790818  [51200/60000]
loss: 1.761231  [57600/60000]
Test Error: 
 Accuracy: 84.1%, Avg loss: 1.748736 

Con 140484272963296 Epoch 3 
-------------------------------
loss: 1.758803  [    0/60000]
loss: 1.730811  [ 6400/60000]
loss: 1.738007  [12800/60000]
loss: 1.726921  [19200/60000]
loss: 1.713006  [25600/60000]
loss: 1.723426  [32000/60000]
loss: 1.683635  [38400/60000]
loss: 1.739653  [44800/60000]
loss: 1.732281  [51200/60000]
loss: 1.704535  [57600/60000]
Test Error: 
 Accuracy: 85.7%, Avg loss: 1.695353 

Con 140484272963296 enery 85.66198617996331
Con 140484091812928 Epoch 1 
-------------------------------
loss: 2.302583  [    0/60000]
loss: 2.181755  [ 6400/60000]
loss: 2.126897  [12800/60000]
loss: 2.016407  [19200/60000]
loss: 1.956866  [25600/60000]
loss: 1.933482  [32000/60000]
loss: 1.878143  [38400/60000]
loss: 1.926250  [44800/60000]
loss: 1.868361  [51200/60000]
loss: 1.836552  [57600/60000]
Test Error: 
 Accuracy: 82.4%, Avg loss: 1.818010 

Con 140484091812928 Epoch 2 
-------------------------------
loss: 1.825432  [    0/60000]
loss: 1.788181  [ 6400/60000]
loss: 1.807883  [12800/60000]
loss: 1.773619  [19200/60000]
loss: 1.751017  [25600/60000]
loss: 1.758632  [32000/60000]
loss: 1.724666  [38400/60000]
loss: 1.789151  [44800/60000]
loss: 1.759907  [51200/60000]
loss: 1.735514  [57600/60000]
Test Error: 
 Accuracy: 84.6%, Avg loss: 1.724223 

Con 140484091812928 Epoch 3 
-------------------------------
loss: 1.729902  [    0/60000]
loss: 1.704229  [ 6400/60000]
loss: 1.723053  [12800/60000]
loss: 1.708829  [19200/60000]
loss: 1.693637  [25600/60000]
loss: 1.705211  [32000/60000]
loss: 1.671924  [38400/60000]
loss: 1.734107  [44800/60000]
loss: 1.716150  [51200/60000]
loss: 1.692819  [57600/60000]
Test Error: 
 Accuracy: 85.9%, Avg loss: 1.683618 

Con 140484091812928 enery 85.91109512565652
sap xep quan the
loai bo ca the yeu duoi
In ra
con 140484275768192 voi gen ['C', 'C'] va mode ['-'] va nang luong 89.09279008140683
con 140484275768288 voi gen ['C', 'C'] va mode ['+'] va nang luong 88.98279008140683
con 140484272959648 voi gen ['R', 'C'] va mode ['-'] va nang luong 88.87118779595029
con 140484275768240 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['-'] va nang luong 86.65198617996332
Sinh con lan thu 2
con duoc sinh 140484091904544 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'R'] va mode ['+']
con duoc sinh 140484093014464 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'R'] va mode ['+']
con duoc sinh 140484091698192 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'R'] va mode ['-']
con duoc sinh 140484088830800 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'R'] va mode ['+']
train voi 3 epoch
Con 140484275768192 Epoch 1 
-------------------------------
loss: 1.583232  [    0/60000]
loss: 1.591700  [ 6400/60000]
loss: 1.595053  [12800/60000]
loss: 1.612114  [19200/60000]
loss: 1.589947  [25600/60000]
loss: 1.630651  [32000/60000]
loss: 1.585878  [38400/60000]
loss: 1.626588  [44800/60000]
loss: 1.632016  [51200/60000]
loss: 1.608592  [57600/60000]
Test Error: 
 Accuracy: 89.2%, Avg loss: 1.598794 

Con 140484275768192 Epoch 2 
-------------------------------
loss: 1.576458  [    0/60000]
loss: 1.587361  [ 6400/60000]
loss: 1.589550  [12800/60000]
loss: 1.608743  [19200/60000]
loss: 1.585105  [25600/60000]
loss: 1.627566  [32000/60000]
loss: 1.582063  [38400/60000]
loss: 1.622483  [44800/60000]
loss: 1.627837  [51200/60000]
loss: 1.605199  [57600/60000]
Test Error: 
 Accuracy: 89.3%, Avg loss: 1.594730 

Con 140484275768192 Epoch 3 
-------------------------------
loss: 1.570788  [    0/60000]
loss: 1.583743  [ 6400/60000]
loss: 1.584896  [12800/60000]
loss: 1.605937  [19200/60000]
loss: 1.581108  [25600/60000]
loss: 1.624926  [32000/60000]
loss: 1.578763  [38400/60000]
loss: 1.619056  [44800/60000]
loss: 1.624247  [51200/60000]
loss: 1.602374  [57600/60000]
Test Error: 
 Accuracy: 89.5%, Avg loss: 1.591259 

Con 140484275768192 enery 89.53372148371487
Con 140484275768288 Epoch 1 
-------------------------------
loss: 1.585824  [    0/60000]
loss: 1.592325  [ 6400/60000]
loss: 1.596683  [12800/60000]
loss: 1.612952  [19200/60000]
loss: 1.591859  [25600/60000]
loss: 1.631118  [32000/60000]
loss: 1.586703  [38400/60000]
loss: 1.627286  [44800/60000]
loss: 1.632737  [51200/60000]
loss: 1.607913  [57600/60000]
Test Error: 
 Accuracy: 89.1%, Avg loss: 1.599829 

Con 140484275768288 Epoch 2 
-------------------------------
loss: 1.578742  [    0/60000]
loss: 1.587880  [ 6400/60000]
loss: 1.590982  [12800/60000]
loss: 1.609475  [19200/60000]
loss: 1.586844  [25600/60000]
loss: 1.627900  [32000/60000]
loss: 1.582803  [38400/60000]
loss: 1.623037  [44800/60000]
loss: 1.628414  [51200/60000]
loss: 1.604312  [57600/60000]
Test Error: 
 Accuracy: 89.3%, Avg loss: 1.595645 

Con 140484275768288 Epoch 3 
-------------------------------
loss: 1.572812  [    0/60000]
loss: 1.584184  [ 6400/60000]
loss: 1.586166  [12800/60000]
loss: 1.606591  [19200/60000]
loss: 1.582702  [25600/60000]
loss: 1.625168  [32000/60000]
loss: 1.579440  [38400/60000]
loss: 1.619497  [44800/60000]
loss: 1.624715  [51200/60000]
loss: 1.601320  [57600/60000]
Test Error: 
 Accuracy: 89.5%, Avg loss: 1.592078 

Con 140484275768288 enery 89.46372148371486
Con 140484272959648 Epoch 1 
-------------------------------
loss: 1.588950  [    0/60000]
loss: 1.594775  [ 6400/60000]
loss: 1.600157  [12800/60000]
loss: 1.615526  [19200/60000]
loss: 1.594059  [25600/60000]
loss: 1.634327  [32000/60000]
loss: 1.589633  [38400/60000]
loss: 1.631312  [44800/60000]
loss: 1.633903  [51200/60000]
loss: 1.612543  [57600/60000]
Test Error: 
 Accuracy: 89.0%, Avg loss: 1.602405 

Con 140484272959648 Epoch 2 
-------------------------------
loss: 1.581467  [    0/60000]
loss: 1.589978  [ 6400/60000]
loss: 1.594164  [12800/60000]
loss: 1.611744  [19200/60000]
loss: 1.588758  [25600/60000]
loss: 1.630994  [32000/60000]
loss: 1.585483  [38400/60000]
loss: 1.626653  [44800/60000]
loss: 1.629358  [51200/60000]
loss: 1.608633  [57600/60000]
Test Error: 
 Accuracy: 89.2%, Avg loss: 1.597971 

Con 140484272959648 Epoch 3 
-------------------------------
loss: 1.575209  [    0/60000]
loss: 1.586011  [ 6400/60000]
loss: 1.589103  [12800/60000]
loss: 1.608624  [19200/60000]
loss: 1.584370  [25600/60000]
loss: 1.628163  [32000/60000]
loss: 1.581913  [38400/60000]
loss: 1.622761  [44800/60000]
loss: 1.625474  [51200/60000]
loss: 1.605394  [57600/60000]
Test Error: 
 Accuracy: 89.3%, Avg loss: 1.594194 

Con 140484272959648 enery 89.32158431337334
Con 140484275768240 Epoch 1 
-------------------------------
loss: 1.657949  [    0/60000]
loss: 1.646158  [ 6400/60000]
loss: 1.657534  [12800/60000]
loss: 1.657622  [19200/60000]
loss: 1.644861  [25600/60000]
loss: 1.665669  [32000/60000]
loss: 1.626125  [38400/60000]
loss: 1.674523  [44800/60000]
loss: 1.674636  [51200/60000]
loss: 1.650747  [57600/60000]
Test Error: 
 Accuracy: 87.4%, Avg loss: 1.641450 

Con 140484275768240 Epoch 2 
-------------------------------
loss: 1.633829  [    0/60000]
loss: 1.627755  [ 6400/60000]
loss: 1.637569  [12800/60000]
loss: 1.642597  [19200/60000]
loss: 1.627889  [25600/60000]
loss: 1.654207  [32000/60000]
loss: 1.613300  [38400/60000]
loss: 1.658755  [44800/60000]
loss: 1.661055  [51200/60000]
loss: 1.637632  [57600/60000]
Test Error: 
 Accuracy: 88.0%, Avg loss: 1.628239 

Con 140484275768240 Epoch 3 
-------------------------------
loss: 1.616381  [    0/60000]
loss: 1.615202  [ 6400/60000]
loss: 1.623351  [12800/60000]
loss: 1.632409  [19200/60000]
loss: 1.615234  [25600/60000]
loss: 1.646308  [32000/60000]
loss: 1.604154  [38400/60000]
loss: 1.647566  [44800/60000]
loss: 1.650946  [51200/60000]
loss: 1.628103  [57600/60000]
Test Error: 
 Accuracy: 88.4%, Avg loss: 1.618464 

Con 140484275768240 enery 88.3926492188974
Con 140484091904544 Epoch 1 
-------------------------------
loss: 2.306398  [    0/60000]
loss: 2.154506  [ 6400/60000]
loss: 2.079078  [12800/60000]
loss: 1.970822  [19200/60000]
loss: 1.913228  [25600/60000]
loss: 1.894345  [32000/60000]
loss: 1.832665  [38400/60000]
loss: 1.879630  [44800/60000]
loss: 1.835514  [51200/60000]
loss: 1.801083  [57600/60000]
Test Error: 
 Accuracy: 83.0%, Avg loss: 1.785881 

Con 140484091904544 Epoch 2 
-------------------------------
loss: 1.793357  [    0/60000]
loss: 1.757560  [ 6400/60000]
loss: 1.771066  [12800/60000]
loss: 1.747158  [19200/60000]
loss: 1.731559  [25600/60000]
loss: 1.739706  [32000/60000]
loss: 1.700030  [38400/60000]
loss: 1.758376  [44800/60000]
loss: 1.740870  [51200/60000]
loss: 1.714053  [57600/60000]
Test Error: 
 Accuracy: 85.1%, Avg loss: 1.704923 

Con 140484091904544 Epoch 3 
-------------------------------
loss: 1.709607  [    0/60000]
loss: 1.685110  [ 6400/60000]
loss: 1.700029  [12800/60000]
loss: 1.691237  [19200/60000]
loss: 1.681575  [25600/60000]
loss: 1.693910  [32000/60000]
loss: 1.656237  [38400/60000]
loss: 1.710610  [44800/60000]
loss: 1.702911  [51200/60000]
loss: 1.677201  [57600/60000]
Test Error: 
 Accuracy: 86.3%, Avg loss: 1.669543 

Con 140484091904544 enery 86.28146070730644
Con 140484093014464 Epoch 1 
-------------------------------
loss: 2.314132  [    0/60000]
loss: 2.158527  [ 6400/60000]
loss: 2.091355  [12800/60000]
loss: 1.966037  [19200/60000]
loss: 1.912010  [25600/60000]
loss: 1.891583  [32000/60000]
loss: 1.838772  [38400/60000]
loss: 1.885832  [44800/60000]
loss: 1.835537  [51200/60000]
loss: 1.805938  [57600/60000]
Test Error: 
 Accuracy: 82.7%, Avg loss: 1.789057 

Con 140484093014464 Epoch 2 
-------------------------------
loss: 1.799163  [    0/60000]
loss: 1.762058  [ 6400/60000]
loss: 1.781406  [12800/60000]
loss: 1.749661  [19200/60000]
loss: 1.732677  [25600/60000]
loss: 1.740817  [32000/60000]
loss: 1.706154  [38400/60000]
loss: 1.767096  [44800/60000]
loss: 1.743450  [51200/60000]
loss: 1.720414  [57600/60000]
Test Error: 
 Accuracy: 84.9%, Avg loss: 1.708801 

Con 140484093014464 Epoch 3 
-------------------------------
loss: 1.715395  [    0/60000]
loss: 1.690144  [ 6400/60000]
loss: 1.708313  [12800/60000]
loss: 1.694424  [19200/60000]
loss: 1.682684  [25600/60000]
loss: 1.695752  [32000/60000]
loss: 1.661002  [38400/60000]
loss: 1.719493  [44800/60000]
loss: 1.705621  [51200/60000]
loss: 1.683573  [57600/60000]
Test Error: 
 Accuracy: 86.3%, Avg loss: 1.673238 

Con 140484093014464 enery 86.27146070730643
Con 140484091698192 Epoch 1 
-------------------------------
loss: 2.303587  [    0/60000]
loss: 2.163712  [ 6400/60000]
loss: 2.096148  [12800/60000]
loss: 1.990502  [19200/60000]
loss: 1.929636  [25600/60000]
loss: 1.908915  [32000/60000]
loss: 1.846743  [38400/60000]
loss: 1.888390  [44800/60000]
loss: 1.844333  [51200/60000]
loss: 1.810133  [57600/60000]
Test Error: 
 Accuracy: 82.6%, Avg loss: 1.794818 

Con 140484091698192 Epoch 2 
-------------------------------
loss: 1.801868  [    0/60000]
loss: 1.766594  [ 6400/60000]
loss: 1.779281  [12800/60000]
loss: 1.754445  [19200/60000]
loss: 1.735210  [25600/60000]
loss: 1.742837  [32000/60000]
loss: 1.704654  [38400/60000]
loss: 1.761326  [44800/60000]
loss: 1.744412  [51200/60000]
loss: 1.718890  [57600/60000]
Test Error: 
 Accuracy: 85.1%, Avg loss: 1.708555 

Con 140484091698192 Epoch 3 
-------------------------------
loss: 1.713832  [    0/60000]
loss: 1.689472  [ 6400/60000]
loss: 1.703677  [12800/60000]
loss: 1.694571  [19200/60000]
loss: 1.682169  [25600/60000]
loss: 1.694109  [32000/60000]
loss: 1.658295  [38400/60000]
loss: 1.712054  [44800/60000]
loss: 1.704772  [51200/60000]
loss: 1.680443  [57600/60000]
Test Error: 
 Accuracy: 86.3%, Avg loss: 1.671385 

Con 140484091698192 enery 86.32146070730643
Con 140484088830800 Epoch 1 
-------------------------------
loss: 2.310522  [    0/60000]
loss: 2.178995  [ 6400/60000]
loss: 2.109660  [12800/60000]
loss: 2.003412  [19200/60000]
loss: 1.945040  [25600/60000]
loss: 1.920722  [32000/60000]
loss: 1.859905  [38400/60000]
loss: 1.903993  [44800/60000]
loss: 1.851220  [51200/60000]
loss: 1.819023  [57600/60000]
Test Error: 
 Accuracy: 82.7%, Avg loss: 1.803157 

Con 140484088830800 Epoch 2 
-------------------------------
loss: 1.811583  [    0/60000]
loss: 1.776789  [ 6400/60000]
loss: 1.788990  [12800/60000]
loss: 1.762771  [19200/60000]
loss: 1.743109  [25600/60000]
loss: 1.749282  [32000/60000]
loss: 1.712648  [38400/60000]
loss: 1.771429  [44800/60000]
loss: 1.747552  [51200/60000]
loss: 1.723712  [57600/60000]
Test Error: 
 Accuracy: 84.9%, Avg loss: 1.713963 

Con 140484088830800 Epoch 3 
-------------------------------
loss: 1.720076  [    0/60000]
loss: 1.696337  [ 6400/60000]
loss: 1.710371  [12800/60000]
loss: 1.700942  [19200/60000]
loss: 1.687958  [25600/60000]
loss: 1.698567  [32000/60000]
loss: 1.664072  [38400/60000]
loss: 1.719546  [44800/60000]
loss: 1.706762  [51200/60000]
loss: 1.683764  [57600/60000]
Test Error: 
 Accuracy: 86.1%, Avg loss: 1.675592 

Con 140484088830800 enery 86.14146070730644
sap xep quan the
loai bo ca the yeu duoi
In ra
con 140484275768192 voi gen ['C', 'C'] va mode ['-'] va nang luong 89.53372148371487
con 140484275768288 voi gen ['C', 'C'] va mode ['+'] va nang luong 89.46372148371486
con 140484272959648 voi gen ['R', 'C'] va mode ['-'] va nang luong 89.32158431337334
con 140484275768240 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['-'] va nang luong 88.3926492188974
Sinh con lan thu 3
con duoc sinh 140484089663440 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'R'] va mode ['+']
con duoc sinh 140484091155744 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['-']
con duoc sinh 140484088395232 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['+']
con duoc sinh 140484088361936 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['-']
train voi 3 epoch
Con 140484275768192 Epoch 1 
-------------------------------
loss: 1.565973  [    0/60000]
loss: 1.580667  [ 6400/60000]
loss: 1.580901  [12800/60000]
loss: 1.603550  [19200/60000]
loss: 1.577755  [25600/60000]
loss: 1.622625  [32000/60000]
loss: 1.575869  [38400/60000]
loss: 1.616155  [44800/60000]
loss: 1.621120  [51200/60000]
loss: 1.599979  [57600/60000]
Test Error: 
 Accuracy: 89.7%, Avg loss: 1.588253 

Con 140484275768192 Epoch 2 
-------------------------------
loss: 1.561831  [    0/60000]
loss: 1.578011  [ 6400/60000]
loss: 1.577428  [12800/60000]
loss: 1.601481  [19200/60000]
loss: 1.574907  [25600/60000]
loss: 1.620587  [32000/60000]
loss: 1.573300  [38400/60000]
loss: 1.613669  [44800/60000]
loss: 1.618364  [51200/60000]
loss: 1.597918  [57600/60000]
Test Error: 
 Accuracy: 89.8%, Avg loss: 1.585617 

Con 140484275768192 Epoch 3 
-------------------------------
loss: 1.558230  [    0/60000]
loss: 1.575689  [ 6400/60000]
loss: 1.574378  [12800/60000]
loss: 1.599661  [19200/60000]
loss: 1.572458  [25600/60000]
loss: 1.618758  [32000/60000]
loss: 1.570997  [38400/60000]
loss: 1.611517  [44800/60000]
loss: 1.615911  [51200/60000]
loss: 1.596121  [57600/60000]
Test Error: 
 Accuracy: 89.9%, Avg loss: 1.583282 

Con 140484275768192 enery 89.93292495823509
Con 140484275768288 Epoch 1 
-------------------------------
loss: 1.567773  [    0/60000]
loss: 1.581050  [ 6400/60000]
loss: 1.582035  [12800/60000]
loss: 1.604145  [19200/60000]
loss: 1.579229  [25600/60000]
loss: 1.622806  [32000/60000]
loss: 1.576495  [38400/60000]
loss: 1.616504  [44800/60000]
loss: 1.621506  [51200/60000]
loss: 1.598790  [57600/60000]
Test Error: 
 Accuracy: 89.6%, Avg loss: 1.588995 

Con 140484275768288 Epoch 2 
-------------------------------
loss: 1.563441  [    0/60000]
loss: 1.578348  [ 6400/60000]
loss: 1.578445  [12800/60000]
loss: 1.602032  [19200/60000]
loss: 1.576278  [25600/60000]
loss: 1.620732  [32000/60000]
loss: 1.573885  [38400/60000]
loss: 1.613944  [44800/60000]
loss: 1.618687  [51200/60000]
loss: 1.596617  [57600/60000]
Test Error: 
 Accuracy: 89.7%, Avg loss: 1.586296 

Con 140484275768288 Epoch 3 
-------------------------------
loss: 1.559676  [    0/60000]
loss: 1.575988  [ 6400/60000]
loss: 1.575294  [12800/60000]
loss: 1.600180  [19200/60000]
loss: 1.573740  [25600/60000]
loss: 1.618885  [32000/60000]
loss: 1.571548  [38400/60000]
loss: 1.611733  [44800/60000]
loss: 1.616187  [51200/60000]
loss: 1.594726  [57600/60000]
Test Error: 
 Accuracy: 89.8%, Avg loss: 1.583909 

Con 140484275768288 enery 89.85292495823509
index.py:91: RuntimeWarning: More than 20 figures have been opened. Figures created through the pyplot interface (`matplotlib.pyplot.figure`) are retained until explicitly closed and may consume too much memory. (To control this warning, see the rcParam `figure.max_open_warning`).
  plt.figure(figsize=(5, 2.7))
Con 140484272959648 Epoch 1 
-------------------------------
loss: 1.569899  [    0/60000]
loss: 1.582662  [ 6400/60000]
loss: 1.584763  [12800/60000]
loss: 1.605991  [19200/60000]
loss: 1.580688  [25600/60000]
loss: 1.625709  [32000/60000]
loss: 1.578792  [38400/60000]
loss: 1.619465  [44800/60000]
loss: 1.622108  [51200/60000]
loss: 1.602665  [57600/60000]
Test Error: 
 Accuracy: 89.5%, Avg loss: 1.590932 

Con 140484272959648 Epoch 2 
-------------------------------
loss: 1.565340  [    0/60000]
loss: 1.579787  [ 6400/60000]
loss: 1.580993  [12800/60000]
loss: 1.603725  [19200/60000]
loss: 1.577559  [25600/60000]
loss: 1.623548  [32000/60000]
loss: 1.576031  [38400/60000]
loss: 1.616640  [44800/60000]
loss: 1.619154  [51200/60000]
loss: 1.600330  [57600/60000]
Test Error: 
 Accuracy: 89.6%, Avg loss: 1.588079 

Con 140484272959648 Epoch 3 
-------------------------------
loss: 1.561382  [    0/60000]
loss: 1.577286  [ 6400/60000]
loss: 1.577683  [12800/60000]
loss: 1.601744  [19200/60000]
loss: 1.574870  [25600/60000]
loss: 1.621619  [32000/60000]
loss: 1.573560  [38400/60000]
loss: 1.614195  [44800/60000]
loss: 1.616538  [51200/60000]
loss: 1.598305  [57600/60000]
Test Error: 
 Accuracy: 89.8%, Avg loss: 1.585559 

Con 140484272959648 enery 89.77124521583417
Con 140484275768240 Epoch 1 
-------------------------------
loss: 1.603097  [    0/60000]
loss: 1.606051  [ 6400/60000]
loss: 1.612601  [12800/60000]
loss: 1.625087  [19200/60000]
loss: 1.605426  [25600/60000]
loss: 1.640386  [32000/60000]
loss: 1.597153  [38400/60000]
loss: 1.639191  [44800/60000]
loss: 1.643075  [51200/60000]
loss: 1.620876  [57600/60000]
Test Error: 
 Accuracy: 88.8%, Avg loss: 1.610886 

Con 140484275768240 Epoch 2 
-------------------------------
loss: 1.592638  [    0/60000]
loss: 1.599077  [ 6400/60000]
loss: 1.604141  [12800/60000]
loss: 1.619554  [19200/60000]
loss: 1.597666  [25600/60000]
loss: 1.635723  [32000/60000]
loss: 1.591537  [38400/60000]
loss: 1.632678  [44800/60000]
loss: 1.636740  [51200/60000]
loss: 1.615222  [57600/60000]
Test Error: 
 Accuracy: 89.0%, Avg loss: 1.604810 

Con 140484275768240 Epoch 3 
-------------------------------
loss: 1.584189  [    0/60000]
loss: 1.593577  [ 6400/60000]
loss: 1.597279  [12800/60000]
loss: 1.615188  [19200/60000]
loss: 1.591430  [25600/60000]
loss: 1.631922  [32000/60000]
loss: 1.586882  [38400/60000]
loss: 1.627466  [44800/60000]
loss: 1.631507  [51200/60000]
loss: 1.610690  [57600/60000]
Test Error: 
 Accuracy: 89.1%, Avg loss: 1.599812 

Con 140484275768240 enery 89.13208219495884
Con 140484089663440 Epoch 1 
-------------------------------
loss: 2.304554  [    0/60000]
loss: 2.114658  [ 6400/60000]
loss: 2.039458  [12800/60000]
loss: 1.927630  [19200/60000]
loss: 1.876155  [25600/60000]
loss: 1.856194  [32000/60000]
loss: 1.802013  [38400/60000]
loss: 1.850065  [44800/60000]
loss: 1.806884  [51200/60000]
loss: 1.777875  [57600/60000]
Test Error: 
 Accuracy: 83.2%, Avg loss: 1.763919 

Con 140484089663440 Epoch 2 
-------------------------------
loss: 1.771073  [    0/60000]
loss: 1.737268  [ 6400/60000]
loss: 1.752327  [12800/60000]
loss: 1.731583  [19200/60000]
loss: 1.717235  [25600/60000]
loss: 1.723730  [32000/60000]
loss: 1.686663  [38400/60000]
loss: 1.744450  [44800/60000]
loss: 1.726616  [51200/60000]
loss: 1.703411  [57600/60000]
Test Error: 
 Accuracy: 85.3%, Avg loss: 1.693492 

Con 140484089663440 Epoch 3 
-------------------------------
loss: 1.696025  [    0/60000]
loss: 1.673763  [ 6400/60000]
loss: 1.689759  [12800/60000]
loss: 1.682926  [19200/60000]
loss: 1.672263  [25600/60000]
loss: 1.684550  [32000/60000]
loss: 1.648006  [38400/60000]
loss: 1.702428  [44800/60000]
loss: 1.693667  [51200/60000]
loss: 1.670748  [57600/60000]
Test Error: 
 Accuracy: 86.6%, Avg loss: 1.661742 

Con 140484089663440 enery 86.55114806571582
Con 140484091155744 Epoch 1 
-------------------------------
loss: 2.302778  [    0/60000]
loss: 2.171963  [ 6400/60000]
loss: 2.100882  [12800/60000]
loss: 1.998419  [19200/60000]
loss: 1.940460  [25600/60000]
loss: 1.917429  [32000/60000]
loss: 1.849597  [38400/60000]
loss: 1.884440  [44800/60000]
loss: 1.847184  [51200/60000]
loss: 1.808877  [57600/60000]
Test Error: 
 Accuracy: 82.8%, Avg loss: 1.795010 

Con 140484091155744 Epoch 2 
-------------------------------
loss: 1.803727  [    0/60000]
loss: 1.767877  [ 6400/60000]
loss: 1.774164  [12800/60000]
loss: 1.753774  [19200/60000]
loss: 1.735139  [25600/60000]
loss: 1.743217  [32000/60000]
loss: 1.701326  [38400/60000]
loss: 1.750705  [44800/60000]
loss: 1.743030  [51200/60000]
loss: 1.714114  [57600/60000]
Test Error: 
 Accuracy: 85.1%, Avg loss: 1.706138 

Con 140484091155744 Epoch 3 
-------------------------------
loss: 1.712575  [    0/60000]
loss: 1.688946  [ 6400/60000]
loss: 1.699181  [12800/60000]
loss: 1.692902  [19200/60000]
loss: 1.680430  [25600/60000]
loss: 1.692874  [32000/60000]
loss: 1.655216  [38400/60000]
loss: 1.700934  [44800/60000]
loss: 1.703323  [51200/60000]
loss: 1.674910  [57600/60000]
Test Error: 
 Accuracy: 86.4%, Avg loss: 1.668966 

Con 140484091155744 enery 86.35208219495885
Con 140484088395232 Epoch 1 
-------------------------------
loss: 2.305089  [    0/60000]
loss: 2.136546  [ 6400/60000]
loss: 2.050235  [12800/60000]
loss: 1.946989  [19200/60000]
loss: 1.889506  [25600/60000]
loss: 1.872568  [32000/60000]
loss: 1.808601  [38400/60000]
loss: 1.859330  [44800/60000]
loss: 1.820955  [51200/60000]
loss: 1.783087  [57600/60000]
Test Error: 
 Accuracy: 83.1%, Avg loss: 1.770981 

Con 140484088395232 Epoch 2 
-------------------------------
loss: 1.777822  [    0/60000]
loss: 1.747995  [ 6400/60000]
loss: 1.754211  [12800/60000]
loss: 1.736992  [19200/60000]
loss: 1.720066  [25600/60000]
loss: 1.729115  [32000/60000]
loss: 1.687682  [38400/60000]
loss: 1.746727  [44800/60000]
loss: 1.733001  [51200/60000]
loss: 1.704123  [57600/60000]
Test Error: 
 Accuracy: 85.3%, Avg loss: 1.696429 

Con 140484088395232 Epoch 3 
-------------------------------
loss: 1.699653  [    0/60000]
loss: 1.680693  [ 6400/60000]
loss: 1.689667  [12800/60000]
loss: 1.685275  [19200/60000]
loss: 1.673463  [25600/60000]
loss: 1.687033  [32000/60000]
loss: 1.647751  [38400/60000]
loss: 1.702775  [44800/60000]
loss: 1.697707  [51200/60000]
loss: 1.670106  [57600/60000]
Test Error: 
 Accuracy: 86.6%, Avg loss: 1.663424 

Con 140484088395232 enery 86.63208219495884
Con 140484088361936 Epoch 1 
-------------------------------
loss: 2.293602  [    0/60000]
loss: 2.206078  [ 6400/60000]
loss: 2.156027  [12800/60000]
loss: 2.050495  [19200/60000]
loss: 1.998795  [25600/60000]
loss: 1.977474  [32000/60000]
loss: 1.912497  [38400/60000]
loss: 1.947263  [44800/60000]
loss: 1.892903  [51200/60000]
loss: 1.858596  [57600/60000]
Test Error: 
 Accuracy: 82.0%, Avg loss: 1.840633 

Con 140484088361936 Epoch 2 
-------------------------------
loss: 1.847370  [    0/60000]
loss: 1.810413  [ 6400/60000]
loss: 1.825261  [12800/60000]
loss: 1.789223  [19200/60000]
loss: 1.766764  [25600/60000]
loss: 1.776450  [32000/60000]
loss: 1.736328  [38400/60000]
loss: 1.794442  [44800/60000]
loss: 1.769750  [51200/60000]
loss: 1.744619  [57600/60000]
Test Error: 
 Accuracy: 84.5%, Avg loss: 1.733520 

Con 140484088361936 Epoch 3 
-------------------------------
loss: 1.740792  [    0/60000]
loss: 1.714355  [ 6400/60000]
loss: 1.730074  [12800/60000]
loss: 1.716299  [19200/60000]
loss: 1.702135  [25600/60000]
loss: 1.714431  [32000/60000]
loss: 1.677448  [38400/60000]
loss: 1.734114  [44800/60000]
loss: 1.721514  [51200/60000]
loss: 1.697800  [57600/60000]
Test Error: 
 Accuracy: 85.8%, Avg loss: 1.688673 

Con 140484088361936 enery 85.80208219495884
sap xep quan the
loai bo ca the yeu duoi
In ra
con 140484275768192 voi gen ['C', 'C'] va mode ['-'] va nang luong 89.93292495823509
con 140484275768288 voi gen ['C', 'C'] va mode ['+'] va nang luong 89.85292495823509
con 140484272959648 voi gen ['R', 'C'] va mode ['-'] va nang luong 89.77124521583417
con 140484275768240 voi gen [Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
), 'C'] va mode ['-'] va nang luong 89.13208219495884
dung
train voi 5 epoch
Con 140484275768192 Epoch 1 
-------------------------------
loss: 1.555071  [    0/60000]
loss: 1.573637  [ 6400/60000]
loss: 1.571676  [12800/60000]
loss: 1.598038  [19200/60000]
loss: 1.570331  [25600/60000]
loss: 1.617102  [32000/60000]
loss: 1.568913  [38400/60000]
loss: 1.609639  [44800/60000]
loss: 1.613709  [51200/60000]
loss: 1.594535  [57600/60000]
Test Error: 
 Accuracy: 90.0%, Avg loss: 1.581195 

Con 140484275768192 Epoch 2 
-------------------------------
loss: 1.552276  [    0/60000]
loss: 1.571808  [ 6400/60000]
loss: 1.569264  [12800/60000]
loss: 1.596576  [19200/60000]
loss: 1.568467  [25600/60000]
loss: 1.615586  [32000/60000]
loss: 1.567014  [38400/60000]
loss: 1.607986  [44800/60000]
loss: 1.611720  [51200/60000]
loss: 1.593122  [57600/60000]
Test Error: 
 Accuracy: 90.1%, Avg loss: 1.579316 

Con 140484275768192 Epoch 3 
-------------------------------
loss: 1.549786  [    0/60000]
loss: 1.570168  [ 6400/60000]
loss: 1.567096  [12800/60000]
loss: 1.595245  [19200/60000]
loss: 1.566822  [25600/60000]
loss: 1.614189  [32000/60000]
loss: 1.565273  [38400/60000]
loss: 1.606522  [44800/60000]
loss: 1.609912  [51200/60000]
loss: 1.591852  [57600/60000]
Test Error: 
 Accuracy: 90.2%, Avg loss: 1.577613 

Con 140484275768192 Epoch 4 
-------------------------------
loss: 1.547554  [    0/60000]
loss: 1.568687  [ 6400/60000]
loss: 1.565138  [12800/60000]
loss: 1.594024  [19200/60000]
loss: 1.565361  [25600/60000]
loss: 1.612892  [32000/60000]
loss: 1.563669  [38400/60000]
loss: 1.605218  [44800/60000]
loss: 1.608262  [51200/60000]
loss: 1.590701  [57600/60000]
Test Error: 
 Accuracy: 90.2%, Avg loss: 1.576059 

Con 140484275768192 Epoch 5 
-------------------------------
loss: 1.545541  [    0/60000]
loss: 1.567342  [ 6400/60000]
loss: 1.563358  [12800/60000]
loss: 1.592894  [19200/60000]
loss: 1.564057  [25600/60000]
loss: 1.611681  [32000/60000]
loss: 1.562183  [38400/60000]
loss: 1.604046  [44800/60000]
loss: 1.606747  [51200/60000]
loss: 1.589652  [57600/60000]
Test Error: 
 Accuracy: 90.3%, Avg loss: 1.574634 

Con 140484275768192 enery 90.300625
Model(
  (start_block): CNN(
    (main): Sequential(
      (0): Conv2d(1, 32, kernel_size=(3, 3), stride=(2, 2), padding=(1, 1))
      (1): LeakyReLU(negative_slope=0.2)
    )
  )
  (finish_block): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=32768, out_features=10, bias=True)
    (2): Sigmoid()
  )
  (batch_norm): BatchNorm2d(32, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True)
  (layers): ModuleList(
    (0): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
    (1): CNN(
      (main): Sequential(
        (0): Conv2d(32, 32, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
        (1): LeakyReLU(negative_slope=0.2)
      )
    )
  )
)

### Hạn chế và Khó khăn
- Thuật toán cần train nhiều để tìm ra mạng tối ưu
# Gui
Threejs

# Core
python or c++
