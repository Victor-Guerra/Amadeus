import os
import sys
import torch, torchvision
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets
import torch.optim as opt
import customDatasets
import bot

EPOCHS = 3;
BATCH_SIZE = 10;

if __name__ == "__main__":
    if len(sys.argv) == 5:
        script_name, testing_labels, testing_folder, training_labels, training_folder= sys.argv
    else:
        print("python3 bot.py <testing_labels> <testing_files_directory> <training_labels_file> <training_files_directory>")
        exit()


    train_dataset = customDatasets.AmadeusDataSet(training_labels, training_folder, transform = transforms.Compose([transforms.ToTensor()]))
    test_dataset = customDatasets.AmadeusDataSet.(testing_labels, testing_folder, transform = transforms.Compose([transforms.ToTensor()]))

    trainset = torch.utils.data.DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    testset = torch.utils.data.DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=True)

    net = bot.yesNoNet()
    optimizer =  opt.Adam(net.parameters(), lr=0.001,)

    for epoch in range(EPOCHS):
        for data in trainset:
            x, y = data
            net.zero_grad()

            # maybe modify how the data is passed to the model
            output = net(x)
            loss = F.nll_loss(output, y)
            
            loss.backward()
            optimizer.step()
        print(loss)

    torch.save(net, 'amadeus_yesno_weights.pth');
