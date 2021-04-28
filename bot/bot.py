import os
import sys
import torch, torchvision
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets
import torch.optim as opt
import customDatasets


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

