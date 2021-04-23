import os
import sys
import torch, torchvision
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms, datasets
import matplotlib.pyplot as mpl
import torch.optim as opt
import customDatasets

### ==> Importar los conjuntos de datos para entrenamiento y verificacion

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

### ==> Definimos una FeedForward Neural Network que recibe imagenes y dice que numero se dibujo
#   -> como ejempo
class Net(nn.Module):
    def __init__(self):
        super().__init__()  
        ### --> fc1 => Fully connected layer #1, aka la primer capa de nodos
        #   --> Aqui definimos cuantas entradas y cuantas salidas va a tener la primera capa
                    # 28 * 28 = 784 de la imagen de ejemplo
                    # 64 porque la siguiente capa va a tener 64 nodos
        self.fc1 = nn.Linear(784, 64)
        self.fc2 = nn.Linear(64, 64)
        self.fc3 = nn.Linear(64, 64)
                    # output = 10; porque lo que se intenta es seleccionar una de diez opciones
                    # -> es nuestra capa de output, i.e. la que dice que numero es (en este caso)
        self.fc4 = nn.Linear(64, 10)
    def forward(self, x):
        ### ==> Llamamos la funcion de activacion (la que convierte el resultado al intervalo [0,1])
        #       sobre la primer capa de neuronas, despues de que evaluan su resultado sobre x
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = F.relu(self.fc3(x))
        x = self.fc4(x)
        ### ==> Regresamos un tensor del output layer normalizado, es decir, produce resultados definitivos
        #       convirtiendo una lista de flotantes cuya suma es 1 (por que dicen la probabilidad de que 
        #       esa sea la respuesta) a una lista de ENTEROS cuya suma es 1, i.e. un 1 y el resto ceros
        #       dando asi un a respuesta concreta.
        return F.log_softmax(x, dim=1)

net = Net()
#print(net)

### ==> Creamos un conjunto de datos aleatorio para realizar pruebas
X = torch.rand((28, 28))
### ==> Le damos el formato apropiado a los datos con view(tamanio de datos, dimensiones del conjunto)
#       es decir, volvemos unidimensional un arreglo de 28 * 28
output = net(X.view(-1, 28*28))

# ==> o bien
X = X.view(-1, 28 * 28)
output = net(X)

# ==> Visualizamos el resultado o output
output

# ==> Creamos un optimizador para calcular el error
# -> adam = ?; net.parameters() = todo lo que es ajustable en el modelo
# -> lr = learning rate
optimizer =  opt.Adam(net.parameters(), lr=0.001,)

# ==> Creamos un loop para realizar varios pasos de entrenamiento y optimizacion
EPOCHS = 3

for epoch in range(EPOCHS):
    for data in trainset:
        #  data es un conjunto de featuresets y labels
        # x seria el resultado y 'y' o el 'label' es lo que se supone que es
        x, y = data
        # ==> Reiniciamos el valor del gradiente de error 
        net.zero_grad()

        output = net(x.view(-1, 28 * 28))
        # ==> Calculamos el error
        loss = F.nll_loss(output, y)
        # ==> Propagamos hacia atras el error
        loss.backward()
        # ==> Hacemos que el optimizador realize los ajustes necesarios al modelo
        optimizer.step()
    print(loss)

correct = 0
total = 0

# ==> Para simplemente probar multiples predicciones que haga el modelo
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

