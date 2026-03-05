% 1. 读取图片
img = imread('amlab_logo.jpg');

% 2. 归一化到[0,1]范围（如果是uint8类型）
img = im2double(img);

% 3. 设置白色阈值（例如大于0.9为白色）
threshold = 0.9;
mask = img(:,:,1) > threshold & img(:,:,2) > threshold & img(:,:,3) > threshold;

% 4. 创建Alpha通道：白色区域为0（透明），其他为1（不透明）
alpha = double(~mask); % 逻辑取反

% 5. 保存为带透明度的PNG
imwrite(img, 'output.png', 'Alpha', alpha);