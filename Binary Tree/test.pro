QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = test
TEMPLATE = app


SOURCES += main.cpp\
    bst_properties.cpp \
    mw.cpp \
    render_area.cpp

HEADERS  += \
    bst.h \
    bst_properties.h \
    mw.h \
    render_area.h

FORMS    +=
