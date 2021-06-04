import os
import sys
import torch, torchvision
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets
import torch.optim as opt
import customDatasets
import bot

EPOCHS = 4
BATCH_SIZE = 5

if __name__ == "__main__":
    if len(sys.argv) == 3:
        script_name, training_labels, training_folder= sys.argv
    else:
        print("python3 bot.py <testing_labels> <testing_files_directory> <training_labels_file> <training_files_directory>")
        exit()


    train_dataset = customDatasets.AmadeusDataSet(training_labels, training_folder) #transforms.Compose([transforms.ToTensor()]))
    #test_dataset = customDatasets.AmadeusDataSet(testing_labels, testing_folder, transform = transforms.Compose([transforms.ToTensor()]))

    trainset = torch.utils.data.DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    #testset = torch.utils.data.DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=True)

    net = bot.yesNoNet()
    net.load_state_dict(torch.load('amadeus_yesno_weights.pth'))
    net.eval()
    #net = torch.load('amadeus_yesno_weights.pth')
    optimizer =  opt.Adam(net.parameters(), lr=0.001,)
    criterion = nn.BCEWithLogitsLoss()

    for epoch in range(EPOCHS):
        for data in trainset:
            x, y = data
            net.zero_grad()

            # maybe modify how the data is passed to the model
            output = net(x)
            print(output)
            loss = criterion(output, y)
            #loss = F.nll_loss(output[0], y)
            print(loss)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        print(loss)

    torch.save(net.state_dict(), 'amadeus_yesno_weights.pth')
