class TreeNode {
    constructor(value) {
        this.value = value;
        this.color = 'red';  // New nodes are initially red
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.NIL = new TreeNode(null);  // Sentinel node, representing NIL
        this.NIL.color = 'black';  // NIL nodes are black
        this.root = this.NIL;
    }

    insert(value) {
        // Check if the value already exists in the tree
        if (this.search(value) !== null) {
            alert("Value already exists in the tree.");
            return; // Don't insert the duplicate value
        }
    
        const newNode = new TreeNode(value);
        let temp = this.root;
        let parent = null;
    
        // Find the parent where the new node should be inserted
        while (temp !== this.NIL) {
            parent = temp;
            if (newNode.value < temp.value) {
                temp = temp.left;
            } else {
                temp = temp.right;
            }
        }
    
        newNode.parent = parent;
        if (parent === null) {
            this.root = newNode;  // Tree was empty, new node is the root
        } else if (newNode.value < parent.value) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    
        newNode.left = this.NIL;
        newNode.right = this.NIL;
    
        // Fix the red-black tree properties
        this.fixInsert(newNode);
        this.draw();
    }
    search(value) {
        let node = this.root;
        while (node !== this.NIL) {
            if (value === node.value) {
                return node;  // Node with the value found
            }
            node = value < node.value ? node.left : node.right;
        }
        return null;  // Node not found
    }
    
    

    fixInsert(node) {
        while (node.parent.color === 'red') {
            if (node.parent === node.parent.parent.left) {
                let uncle = node.parent.parent.right;
                if (uncle.color === 'red') {
                    // Case 1: Uncle is red
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        // Case 2: Node is right child, left rotate
                        node = node.parent;
                        this.leftRotate(node);
                    }
                    // Case 3: Node is left child, right rotate
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rightRotate(node.parent.parent);
                }
            } else {
                let uncle = node.parent.parent.left;
                if (uncle.color === 'red') {
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rightRotate(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.leftRotate(node.parent.parent);
                }
            }
        }
        this.root.color = 'black';
    }

    leftRotate(x) {
        let y = x.right;
        x.right = y.left;
        if (y.left !== this.NIL) {
            y.left.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }
        y.left = x;
        x.parent = y;
    }

    rightRotate(x) {
        let y = x.left;
        x.left = y.right;
        if (y.right !== this.NIL) {
            y.right.parent = x;
        }
        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x === x.parent.right) {
            x.parent.right = y;
        } else {
            x.parent.left = y;
        }
        y.right = x;
        x.parent = y;
    }

    // Traversal methods (preorder, inorder, postorder)
    preOrderTraversal(node = this.root) {
        if (node === this.NIL) return [];
        let result = [node.value];
        result = result.concat(this.preOrderTraversal(node.left));
        result = result.concat(this.preOrderTraversal(node.right));
        return result;
    }

    inOrderTraversal(node = this.root) {
        if (node === this.NIL) return [];
        let result = this.inOrderTraversal(node.left);
        result.push(node.value);
        result = result.concat(this.inOrderTraversal(node.right));
        return result;
    }

    postOrderTraversal(node = this.root) {
        if (node === this.NIL) return [];
        let result = this.postOrderTraversal(node.left);
        result = result.concat(this.postOrderTraversal(node.right));
        result.push(node.value);
        return result;
    }

    draw() {
        const container = document.getElementById('tree-container');
        container.innerHTML = '';  // Clear previous drawing
        this.drawNode(this.root, container, 500, 50, 200);  // Start drawing from root
    }

    drawNode(node, container, x, y, dx) {
        if (node === this.NIL) return;

        const nodeElement = document.createElement('div');
        nodeElement.className = 'node ' + node.color;
        nodeElement.innerText = node.value;
        nodeElement.style.left = `${x}px`;
        nodeElement.style.top = `${y}px`;

        container.appendChild(nodeElement);

        if (node.left !== this.NIL) {
            this.drawLine(x, y, x - dx, y + 100, container);  // Left line
            this.drawNode(node.left, container, x - dx, y + 100, dx / 2);
        }
        if (node.right !== this.NIL) {
            this.drawLine(x, y, x + dx, y + 100, container);  // Right line
            this.drawNode(node.right, container, x + dx, y + 100, dx / 2);
        }
    }

    drawLine(x1, y1, x2, y2, container) {
        const line = document.createElement('div');
        line.className = 'line';
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;

        container.appendChild(line);
    }

    // Function to display the traversal results
    displayTraversal(type) {
        let result;
        if (type === 'preorder') {
            result = this.preOrderTraversal();
        } else if (type === 'inorder') {
            result = this.inOrderTraversal();
        } else if (type === 'postorder') {
            result = this.postOrderTraversal();
        }
    
        const resultContainer = document.getElementById(`${type}-result`);
        resultContainer.innerHTML = 'Traversal: ' + result.join(' -> ');
    
        // Animate the traversal by highlighting each node
        this.animateTraversal(result);
    }
    
    animateTraversal(nodes) {
        const delay = 500; // Delay in milliseconds between node highlights
        this.clearHighlights();
    
        nodes.forEach((value, index) => {
            setTimeout(() => {
                const nodeElement = this.findNodeElement(value);
                if (nodeElement) {
                    nodeElement.classList.add('highlight');
                    setTimeout(() => {
                        nodeElement.classList.remove('highlight');
                    }, delay);
                }
            }, index * delay);
        });
    }
    
    // Helper function to find the HTML element of a node by its value
    findNodeElement(value) {
        return Array.from(document.getElementsByClassName('node')).find(
            node => node.innerText == value
        );
    }
    
    // Helper function to clear all highlights
    clearHighlights() {
        Array.from(document.getElementsByClassName('node')).forEach(node => {
            node.classList.remove('highlight');
        });
    }
    

animateTraversal(nodes) {
    const delay = 500; // Delay in milliseconds between node highlights
    this.clearHighlights();

    nodes.forEach((value, index) => {
        setTimeout(() => {
            const nodeElement = this.findNodeElement(value);
            if (nodeElement) {
                nodeElement.classList.add('highlight');
                setTimeout(() => {
                    nodeElement.classList.remove('highlight');
                }, delay);
            }
        }, index * delay);
    });
}

// Helper function to find the HTML element of a node by its value
findNodeElement(value) {
    return Array.from(document.getElementsByClassName('node')).find(
        node => node.innerText == value
    );
}

// Helper function to clear all highlights
clearHighlights() {
    Array.from(document.getElementsByClassName('node')).forEach(node => {
        node.classList.remove('highlight');
    });
}


    delete(value) {
        let node = this.root;
        let replacementNode = null;
        let childNode = null;
        let parentNode = null;

        // Find the node to be deleted
        while (node !== this.NIL) {
            if (value === node.value) {
                replacementNode = node;
                break;
            } else if (value < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        if (replacementNode === null) {
            alert("Node not found");
            return;
        }

        // Case 1: Node to be deleted has two children
        if (replacementNode.left !== this.NIL && replacementNode.right !== this.NIL) {
            replacementNode = this.findMin(replacementNode.right);  // Find in-order successor
        }

        // Case 2: Node to be deleted has one or no child
        if (replacementNode.left !== this.NIL) {
            childNode = replacementNode.left;
        } else {
            childNode = replacementNode.right;
        }

        parentNode = replacementNode.parent;

        if (childNode !== this.NIL) {
            childNode.parent = parentNode;
        }

        if (parentNode === null) {
            this.root = childNode;  // If the node is the root
        } else if (replacementNode === parentNode.left) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }

        if (replacementNode !== node) {
            node.value = replacementNode.value;  // Copy the value of the successor
        }

        if (replacementNode.color === 'black') {
            this.fixDelete(childNode);
        }

        this.draw();  // Redraw the tree after deletion
    }

    findMin(node) {
        while (node.left !== this.NIL) {
            node = node.left;
        }
        return node;
    }

    fixDelete(node) {
        while (node !== this.root && node.color === 'black') {
            if (node === node.parent.left) {
                let sibling = node.parent.right;
                if (sibling.color === 'red') {
                    sibling.color = 'black';
                    node.parent.color = 'red';
                    this.leftRotate(node.parent);
                    sibling = node.parent.right;
                }

                if (sibling.left.color === 'black' && sibling.right.color === 'black') {
                    sibling.color = 'red';
                    node = node.parent;
                } else {
                    if (sibling.right.color === 'black') {
                        sibling.left.color = 'black';
                        sibling.color = 'red';
                        this.rightRotate(sibling);
                        sibling = node.parent.right;
                    }

                    sibling.color = node.parent.color;
                    node.parent.color = 'black';
                    sibling.right.color = 'black';
                    this.leftRotate(node.parent);
                    node = this.root;
                }
            }
        }
        node.color = 'black';  // Ensure the root is always black
    }
}

const tree = new RedBlackTree();

document.getElementById('valueInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        insertNode();  // Call insertNode when Enter key is pressed
    }
});

function insertNode() {
    const value = parseInt(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        tree.insert(value);
        document.getElementById('valueInput').value = '';  // Clear input after insertion
    }
}

function deleteNode() {
    const value = parseInt(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        tree.delete(value);
        document.getElementById('valueInput').value = '';  // Clear input after deletion
    }
}

function showTraversal(type) {
    tree.displayTraversal(type);
}