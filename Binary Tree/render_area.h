#ifndef RENDER_AREA_H
#define RENDER_AREA_H
#include "bst.h"
#include <QWidget>
#include <QPen>
#include <QBrush>
#include <QMouseEvent>
#include <QColor>

class RenderArea : public QWidget{
    Q_OBJECT
public:
    explicit RenderArea(BinarySearchTree<int> *bst, QWidget *parent = 0);

    QSize minimumSizeHint() const override;
    QSize sizeHint() const override;
    QColor getNodeColor() const;
    QColor getBackgroundColor() const;
    QColor getTextColor() const;
    void zoomIn();
    void zoomOut();
    bool eventFilter(QObject *, QEvent *event) override;
    void autoSize();
    void callRepaint();
    void changeBackgroundColor(QColor c);
    void changeNodeColor(QColor c);
    void changeTextColor(QColor c);

signals:

public slots:

protected:
    void paintEvent(QPaintEvent *event) override;
    void mouseReleaseEvent(QMouseEvent *event) override;
private:
    BinarySearchTree<int> *bst;
    double scale;
    QPen pen;
    QBrush brush;
    QColor backgroundColor;
    QColor nodeColor;
    QColor textColor;

};

#endif // RENDER_AREA_H
