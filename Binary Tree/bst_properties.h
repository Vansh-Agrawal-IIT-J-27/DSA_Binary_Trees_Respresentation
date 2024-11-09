#ifndef BST_PROPERTIES_H
#define BST_PROPERTIES_H

#include "bst.h"
#include <QMainWindow>
#include <QVBoxLayout>
#include <QHBoxLayout>
#include <QWidget>
#include <QLabel>
#include <QLineEdit>
#include <QTextEdit>
#include <QPushButton>

class BST_Properties : public QMainWindow
{
    Q_OBJECT
    QWidget *centralWidget;
public:
    explicit BST_Properties(QWidget *parent = 0);
    ~BST_Properties();
    void show();
    void closePropertyWindow();
    void update(BinarySearchTree<int> *bst);

private:
    QVBoxLayout *textAreaLayout;
    QHBoxLayout *containerLayout;
    QVBoxLayout *mainLayout;
    QVBoxLayout *labelLayout;
    QTextEdit *inOrderTraversal;
    QTextEdit *preOrderTraversal;
    QTextEdit *postOrderTraversal;
    QLabel *heightLabel;
    QLineEdit *heightValue;
    QLabel *nodeCountLabel;
    QLineEdit *nodeCountValue;
    QLabel *leafNodesLabel;
    QLineEdit *leafNodesValue;
    QLabel *internalNodesLabel;
    QLineEdit *internalNodesValue;
    QPushButton *exitButton;

private slots:
    void exitSlot();
};

#endif // BST_PROPERTIES_H
