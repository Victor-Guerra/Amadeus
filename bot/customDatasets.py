import os
import pandas as pd
import torch, torchvision
from torchvision.io import read_file
from torch.utils.data import Dataset

class AmadeusDataSet(Dataset):
    def __init__(self, labels_file, directory, transform=None, target_transform=None):
        self.labels = pd.read_csv(labels_file)
        self.dir = directory
        self.transform = transform
        self.target_transform = target_transform
    def __len__(self):
        return len(self.labels)

    def __getitem__(self, idx):
        file_path = os.path.join(self.dir, self.labels.iloc[idx, 0])
        file = open(file_path)
        array = file.read() 
        file.close()

        array = array.split(',')
        array = [float(dato) for dato in array]
        array_t = torch.Tensor(array)

        label = self.labels.iloc[idx, 1][2:] + ',' + self.labels.iloc[idx, 2]
        label = label.strip('][').split(',')
        label_t = torch.Tensor([int(num) for num in label])

        if self.transform:
            file = self.transform(file)
        if self.target_transform:
            label = self.target_transform(label)

        return array_t, label_t
