#include "mw.h"
#include <QApplication>

int main(int argc, char *argv[]){
    QApplication x(argc, argv);
    MainWindow mw;
    mw.show();

    return x.exec();
}
