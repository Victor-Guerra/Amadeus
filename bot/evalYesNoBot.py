import os
import sys
import torch, torchvision
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets
import torch.optim as opt
import customDatasets
import bot
import numpy

if __name__ == "__main__":
    if len(sys.argv) == 2:
        script_name, eval_string = sys.argv
    else:
        print("python3 testBot.py <String to be evaluated>")
        exit()

    net = bot.yesNoNet()
    net.load_state_dict(torch.load('bot/amadeus_yesno_weights.pth'))
    net.eval()
    x = eval_string.split(',')
    x = [float(dato) for dato in x]
    x_t = torch.Tensor(x)

    output = net(x_t)
    print(output.detach().numpy().tolist())
