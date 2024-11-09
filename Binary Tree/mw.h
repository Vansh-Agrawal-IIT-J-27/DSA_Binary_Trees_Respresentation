#ifndef MW_H
#define MW_H
#include "bst.h"
#include "bst_properties.h"
#include "render_area.h"
#include <QMainWindow>
#include <QWidget>
#include <QPushButton>
#include <QScrollArea>
#include <QVBoxLayout>
#include <QMenu>
#include <QAction>
#include <QLabel>
#include <QColorDialog>
#include <QColor>

/*
 * BST_Properties.h includes:
 * QMainWindow, QVBoxLayout, QHBoxLayout, QScrollArea, QWidget, QLabel, QLineEdit
 */

class MainWindow : public QMainWindow
{
    Q_OBJECT
    QWidget *centralWidget;

public:
    explicit MainWindow(QWidget *parent = 0);
    ~MainWindow();

private:
    RenderArea *renderArea;
    QPushButton *propertyButton;
    QPushButton *deleteButton;
    QPushButton *insertButton;
    QPushButton *zoomInButton;
    QPushButton *zoomOutButton;
    QLineEdit *insertValueLineEdit;
    QLineEdit *deleteValueLineEdit;
    QAction *loadAction;
    QAction *saveAction;
    QAction *exitAction;
    QAction *resetAction;
    QAction *changeNodeColorAction;
    QAction *changeBackgroundColorAction;
    QAction *changeTextColorAction;
    QScrollArea *treeScrollArea;
    QVBoxLayout *mainLayout;
    QLabel *statusLabel;
    QMenu *fileMenu;
    QMenu *editMenu;
    BST_Properties *prop;
    BinarySearchTree<int> *bst;
    BinarySearchTree<int> *getBST();
    void loadSettings();
    void saveSettings();
    void createMenu();
    void createActions();

protected:
    virtual void closeEvent(QCloseEvent *event);
    virtual void resizeEvent(QResizeEvent* event);

private slots:
    void propertyClicked() const;
    void insertClicked() const;
    void deleteClicked() const;
    void zoomInClicked() const;
    void zoomOutClicked() const;
    void changeNodeColorMenu();
    void changeBackgroundColorMenu();
    void changeTextColorMenu();
    void loadFileMenu();
    void saveMenu();
    void exitMenu();
    void resetMenu() const;
};

#endif // MW_H
