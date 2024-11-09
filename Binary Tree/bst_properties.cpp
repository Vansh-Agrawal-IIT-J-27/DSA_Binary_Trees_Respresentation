#include "bst_properties.h"
#include <QHBoxLayout>
#include <QScrollArea>

BST_Properties::BST_Properties(QWidget *parent) : QMainWindow(parent){
    this->setWindowTitle("Properties");
    this->setFixedSize(QSize(400, 525)); // 236 width

    // labelLayout is on the left side - says what the property is
    labelLayout = new QVBoxLayout;\
    heightLabel = new QLabel("Height:");
    nodeCountLabel = new QLabel("Node count:");
    leafNodesLabel = new QLabel("Leaf nodes:");
    internalNodesLabel = new QLabel("Internal nodes:");
    heightLabel->setStyleSheet("font-size: 14px;");
    nodeCountLabel->setStyleSheet("font-size: 14px;");
    leafNodesLabel->setStyleSheet("font-size: 14px;");
    internalNodesLabel->setStyleSheet("font-size: 14px;");
    labelLayout->addWidget(heightLabel);
    labelLayout->addWidget(nodeCountLabel);
    labelLayout->addWidget(leafNodesLabel);
    labelLayout->addWidget(internalNodesLabel);


    // textAreaLayout is on the right side - displays value of property
    textAreaLayout = new QVBoxLayout;
    heightValue = new QLineEdit("");
    nodeCountValue = new QLineEdit("");
    leafNodesValue = new QLineEdit("");
    internalNodesValue = new QLineEdit("");
    heightValue->setReadOnly(true);
    nodeCountValue->setReadOnly(true);
    leafNodesValue->setReadOnly(true);
    internalNodesValue->setReadOnly(true);

    heightValue->setStyleSheet("color: black; width: 100px;"
                               "padding-left: 10px; font-size: 14px;");
    nodeCountValue->setStyleSheet("color: black; width: 100px;"
                                  "padding-left: 10px; font-size: 14px;");
    leafNodesValue->setStyleSheet("color: black; width: 100px;"
                                  "padding-left: 10px; font-size: 14px;");
    internalNodesValue->setStyleSheet("color: black; width: 100px;"
                                      "padding-left: 10px; font-size: 14px;");

    textAreaLayout->addWidget(heightValue);
    textAreaLayout->addWidget(nodeCountValue);
    textAreaLayout->addWidget(leafNodesValue);
    textAreaLayout->addWidget(internalNodesValue);

    containerLayout = new QHBoxLayout;
    containerLayout->addLayout(labelLayout);
    containerLayout->addLayout(textAreaLayout);
    inOrderTraversal = new QTextEdit;
    preOrderTraversal = new QTextEdit;
    postOrderTraversal = new QTextEdit;
    inOrderTraversal->setReadOnly(true);
    preOrderTraversal->setReadOnly(true);
    postOrderTraversal->setReadOnly(true);

    exitButton = new QPushButton("E&xit", this);
    connect(exitButton, SIGNAL(clicked()), this, SLOT(exitSlot()));

    QHBoxLayout *buttonLayout = new QHBoxLayout;
    buttonLayout->addStretch(0);
    buttonLayout->addWidget(exitButton);

    // Create the main layout and add all the widgets to it
    mainLayout = new QVBoxLayout;
    mainLayout->addLayout(containerLayout);
    mainLayout->addWidget(new QLabel("Inorder Traversal:"));
    mainLayout->addWidget(inOrderTraversal);
    mainLayout->addWidget(new QLabel("Preorder Traversal:"));
    mainLayout->addWidget(preOrderTraversal);
    mainLayout->addWidget(new QLabel("Postorder Traversal:"));
    mainLayout->addWidget(postOrderTraversal);
    mainLayout->addLayout(buttonLayout); // layout for ok/close button

    centralWidget = new QWidget(this);
    centralWidget->setLayout(mainLayout);

    this->setCentralWidget(centralWidget);
}

BST_Properties::~BST_Properties(){
    delete heightLabel;
    delete heightValue;
    delete nodeCountLabel;
    delete nodeCountValue;
    delete leafNodesLabel;
    delete leafNodesValue;
    delete internalNodesLabel;
    delete internalNodesValue;
    delete inOrderTraversal;
    delete preOrderTraversal;
    delete postOrderTraversal;
    delete labelLayout;
    delete textAreaLayout;
    delete containerLayout;
    delete exitButton;
    delete mainLayout;
    delete centralWidget;
}

// Close the window.
void BST_Properties::closePropertyWindow(){
    this->close();
    return;
}

// Update the properties of the tree.
void BST_Properties::update(BinarySearchTree<int> *bst){
    this->inOrderTraversal->setText(bst->getInOrderTraversal());
    this->preOrderTraversal->setText(bst->getPreOrderTraversal());
    this->postOrderTraversal->setText(bst->getPostOrderTraversal());
    this->heightValue->setText(QString::number(bst->getTreeHeight()));
    this->nodeCountValue->setText(QString::number(bst->getNodeCount()));
    this->leafNodesValue->setText(QString::number(bst->getLeafNodeCount()));
    this->internalNodesValue->setText(QString::number(bst->getNodeCount() - bst->getLeafNodeCount()));
    return;
}


// Set window to visible and bring it to the front.
void BST_Properties::show(){
    this->setVisible(true);
    this->activateWindow();
    return;
}

void BST_Properties::exitSlot(){
    this->close();
    return;
}
