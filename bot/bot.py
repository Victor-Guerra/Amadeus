import os
import sys
import torch, torchvision
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets
import matplotlib.pyplot as mpl
import torch.optim as opt
import customDatasets

EPOCHS = 3;

class yesNoNet(nn.Module):
    def __init__(self):
        super().__init__()  
        # ==> Input Layer
        # --> 1 for Intent, 6 for Trait values, 33 (3 * 11) for 11 maximum words with word number,
        # -   word position, and entities.
        self.fc1 = nn.Linear(40, 16)
        # ==> Hidden Layer 1
        self.fc2 = nn.Linear(16, 16)
        # ==> Hidden Layer 2
        self.fc3 = nn.Linear(16, 8)
        # ==> Output Layer
        # - 2 output options, yes and no.
        self.fc4 = nn.Linear(8, 2)

    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = self.fc4(x)
        
        return F.log_softmax(x, dim=1)

if __name__ == "__main__":
    if len(sys.argv) >= 4:
        script_name, testing_labels_file, testing_files_folder, training_labels, training_folder= sys.argv
    else:
        print("python3 bot.py <testing_labels> <testing_files_directory> <training_labels_file> <training_files_directory>")
        exit()


    train_dataset = customDatasets.AmadeusDataSet(training_labels, training_folder, transform = transforms.Compose([transforms.ToTensor()]))
    #test_dataset = datasets.MNIST("", train=False, download=True, transform = transforms.Compose([transforms.ToTensor()]))

    trainset = torch.utils.data.DataLoader(train_dataset, batch_size=10, shuffle=True)
    #testset = torch.utils.data.DataLoader(test_dataset, batch_size=10, shuffle=True)

    net = yesNoNet()
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


# ==> For visualizing training effectiveness
# >   Utilizamos el modelo sin calcular el gradiente de error
    with torch.no_grad():
        for data in trainset:
                x, y = data
                output = net(x.view(-1 ,28*28))   
                for idx, i in enumerate(output):
                    if torch.argmax(i) == y[idx]:
                        correct += 1
                    total += 1
        print("Accuracy: ", round(correct/total, 3))

# ==> Mostramos el ultimo input en x con matplotlib
    mpl.imshow(x[0].view(28,28))
    mpl.show()

