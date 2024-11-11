class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    updateHeight(node) {
        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    }

    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }

    insert(value) {
        this.root = this._insertNode(this.root, value);
        this.draw();
    }

    _insertNode(node, value) {
        if (!node) return new TreeNode(value);

        if (value < node.value) node.left = this._insertNode(node.left, value);
        else if (value > node.value) node.right = this._insertNode(node.right, value);
        else return node;

        this.updateHeight(node);

        const balance = this.getBalance(node);

        if (balance > 1 && value < node.left.value) return this.rotateRight(node);
        if (balance < -1 && value > node.right.value) return this.rotateLeft(node);
        if (balance > 1 && value > node.left.value) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && value < node.right.value) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Add animation during deletion
    delete(value) {
        const path = [];
        this.root = this._deleteNode(this.root, value, path);
        this.highlightTraversalForDelete(path);
        this.draw(); // redraw tree after deletion
    }
    
    _deleteNode(node, value, path) {
        if (!node) return node;
    
        path.push(node);  // Track node for highlighting
    
        // Traverse the tree to find the node to delete
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value, path);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value, path);
        } else {
            // Node found for deletion
            if (!node.left) return node.right;  // If only right child
            if (!node.right) return node.left;  // If only left child
    
            // Node with two children: Find the inorder successor
            let minNode = node.right;
            while (minNode.left) minNode = minNode.left;
            node.value = minNode.value;
    
            // Delete the inorder successor
            node.right = this._deleteNode(node.right, minNode.value, path);
        }
    
        this.updateHeight(node);
    
        // Balance the tree
        const balance = this.getBalance(node);
    
        if (balance > 1 && this.getBalance(node.left) >= 0) return this.rotateRight(node);
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && this.getBalance(node.right) <= 0) return this.rotateLeft(node);
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
    
        return node;
    }
    
    highlightTraversalForDelete(path) {
        let i = 0;
        const interval = setInterval(() => {
            if (i < path.length) {
                // Highlight the nodes in the path to the target node
                path[i].div.classList.add('highlight');
                if (i > 0) {
                    // Remove highlight from the previous node
                    path[i - 1].div.classList.remove('highlight');
                }
            }
    
            if (i === path.length - 1) {
                // Highlight the target node (the node being deleted)
                path[i].div.classList.add('highlight-delete');
            }
    
            if (i === path.length) {
                // Perform the deletion after highlighting
                setTimeout(() => {
                    // Add the delete class to animate the deletion
                    path[i - 1].div.classList.add('node-deleted');
                    setTimeout(() => {
                        // Remove the deleted node after animation
                        path[i - 1].div.remove();
                    }, 500);  // Remove after the deletion animation
                }, 500);
            }
    
            if (i < path.length) {
                i++;
            } else {
                clearInterval(interval);  // Stop the animation once the traversal ends
            }
        }, 500);  // Adjust interval for speed of the animation
    }
    
    

    // Traversal methods
    traversePreOrder(node) {
        const result = [];
        if (node) {
            result.push(node);
            result.push(...this.traversePreOrder(node.left));
            result.push(...this.traversePreOrder(node.right));
        }
        return result;
    }

    traverseInOrder(node) {
        const result = [];
        if (node) {
            result.push(...this.traverseInOrder(node.left));
            result.push(node);
            result.push(...this.traverseInOrder(node.right));
        }
        return result;
    }

    traversePostOrder(node) {
        const result = [];
        if (node) {
            result.push(...this.traversePostOrder(node.left));
            result.push(...this.traversePostOrder(node.right));
            result.push(node);
        }
        return result;
    }

    // Search method to animate the search path
// Search method to animate the search path and show the message after traversal
search(value) {
    const path = [];
    const foundNode = this._searchNode(this.root, value, path);

    if (foundNode) {
        // Highlight the search path after traversal is done
        this.highlightTraversal(path, () => {
            // Show message for 0.5 seconds once traversal is complete
            this.showFoundMessage();
        });
    }
}

// Helper function to search and track the path
_searchNode(node, value, path) {
    if (!node) return null;

    path.push(node);  // Track the node visited during search

    if (value < node.value) {
        return this._searchNode(node.left, value, path);
    } else if (value > node.value) {
        return this._searchNode(node.right, value, path);
    } else {
        return node;  // Found the node
    }
}

// Method to display the "Node Found" message
showFoundMessage() {
    const messageBox = document.getElementById('messageBox');
    
    messageBox.textContent = "Node Found!";
    messageBox.classList.remove('hidden');
    messageBox.classList.add('show');

    // Hide the message after 0.5 seconds
    setTimeout(() => {
        messageBox.classList.remove('show');
        messageBox.classList.add('hidden');
    }, 500);  // 500ms
}

// Highlight the traversal path during search with a callback to show message after traversal
highlightTraversal(path, callback) {
    let i = 0;
    const interval = setInterval(() => {
        if (i > 0) path[i - 1].div.classList.remove('highlight');
        if (i < path.length) {
            path[i].div.classList.add('highlight');
            i++;
        } else {
            clearInterval(interval);
            // Call the callback to show message after traversal is done
            callback();
        }
    }, 500);
}



draw(node = this.root, container = document.getElementById('tree-container')) {
    container.innerHTML = '';
    if (node) {
        // Calculate the total width needed based on the tree depth
        const depth = this._getTreeDepth(node);
        // Start drawing from the middle with the root node
        this._drawNode(node, container, null, 50, 20, depth, 0);
    }
}

_getTreeDepth(node) {
    if (!node) return 0;
    return 1 + Math.max(this._getTreeDepth(node.left), this._getTreeDepth(node.right));
}

_drawNode(node, container, parentElement, x, y, totalDepth, currentDepth) {
    if (!node) return;

    // Create the node element
    const nodeDiv = document.createElement('div');
    nodeDiv.classList.add('node');
    nodeDiv.innerText = node.value;
    nodeDiv.style.left = `${x}%`;
    nodeDiv.style.top = `${y}px`;

    // Attach nodeDiv to TreeNode instance for highlighting
    node.div = nodeDiv;
    container.appendChild(nodeDiv);

    // Draw connecting lines
    if (parentElement) {
        const line = document.createElement('div');
        line.classList.add('line');
        this._drawLine(line, parentElement, nodeDiv, container);
        container.appendChild(line);
    }

    // Calculate horizontal spacing based on depth
    // Exponentially decrease the spacing as we go deeper
    const horizontalSpacing = 30 / (currentDepth + 1);
    const verticalSpacing = 60; // Keep vertical spacing constant

    // Recursively draw children with adjusted spacing
    this._drawNode(
        node.left, 
        container, 
        nodeDiv, 
        x - horizontalSpacing, 
        y + verticalSpacing, 
        totalDepth, 
        currentDepth + 1
    );
    this._drawNode(
        node.right, 
        container, 
        nodeDiv, 
        x + horizontalSpacing, 
        y + verticalSpacing, 
        totalDepth, 
        currentDepth + 1
    );
}

_drawLine(line, parentElement, nodeDiv, container) {
    const parentRect = parentElement.getBoundingClientRect();
    const nodeRect = nodeDiv.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate the distance and angle
    const dx = nodeRect.left - parentRect.left;
    const dy = nodeRect.top - parentRect.top;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate angle without any reduction
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    // Apply the calculated width, position, and transform
    line.style.width = `${length}px`;
    line.style.left = `${parentRect.left - containerRect.left + parentElement.offsetWidth / 2}px`;
    line.style.top = `${parentRect.top - containerRect.top + parentElement.offsetHeight / 2}px`;
    line.style.transform = `rotate(${angle}deg)`;
}
}

// Event functions for controls
const avlTree = new AVLTree();
document.getElementById('valueInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        insertNode();  // Call insertNode when Enter is pressed
    }
});

function insertNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) avlTree.insert(value);
}

function deleteNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) avlTree.delete(value);
}
function searchNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) avlTree.search(value);
    
}
function displayTraversalResult(resultId, nodes) {
    const resultDiv = document.getElementById(resultId);
    resultDiv.textContent = 'Traversal Result: ' + nodes.map(node => node.value).join(' -> ');
}

function resetTree() {
    document.getElementById('tree-container').innerHTML = '';
    avlTree.root = null;
}

function preOrderTraversal() {
    const nodes = avlTree.traversePreOrder(avlTree.root);
    avlTree.highlightTraversal(nodes);
    displayTraversalResult('preOrderResult', nodes);
}

function inOrderTraversal() {
    const nodes = avlTree.traverseInOrder(avlTree.root);
    avlTree.highlightTraversal(nodes);
    displayTraversalResult('inOrderResult', nodes);
}

function postOrderTraversal() {
    const nodes = avlTree.traversePostOrder(avlTree.root);
    avlTree.highlightTraversal(nodes);
    displayTraversalResult('postOrderResult', nodes);
}
