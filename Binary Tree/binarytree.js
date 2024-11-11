class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.div = null; // Store a reference to the DOM element
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // Insert function for Binary Tree (Level-Order Insertion)
    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            const queue = [this.root];
            while (queue.length > 0) {
                const currentNode = queue.shift();

                if (!currentNode.left) {
                    currentNode.left = newNode;
                    break;
                } else if (!currentNode.right) {
                    currentNode.right = newNode;
                    break;
                } else {
                    queue.push(currentNode.left);
                    queue.push(currentNode.right);
                }
            }
        }
        this.draw();
    }

    // Deletion in Binary Tree
    delete(value) {
        if (!this.root) return;

        const queue = [this.root];
        let targetNode = null;
        let lastNode = null;

        while (queue.length > 0) {
            lastNode = queue.shift();

            if (lastNode.value === value) targetNode = lastNode;

            if (lastNode.left) queue.push(lastNode.left);
            if (lastNode.right) queue.push(lastNode.right);
        }

        if (targetNode) {
            targetNode.value = lastNode.value;
            this._deleteDeepestNode(lastNode);
            this.draw();
        }
    }

    _deleteDeepestNode(deepestNode) {
        const queue = [this.root];
        while (queue.length > 0) {
            const currentNode = queue.shift();

            if (currentNode.left === deepestNode) {
                currentNode.left = null;
                return;
            } else if (currentNode.left) {
                queue.push(currentNode.left);
            }

            if (currentNode.right === deepestNode) {
                currentNode.right = null;
                return;
            } else if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }

    // Search function
    search(value) {
        const traversalPath = [];
        const foundNode = this._searchNode(this.root, value, traversalPath);
        this.highlightTraversal(traversalPath, value);
    }

    _searchNode(node, value, path) {
        if (!node) return null;
        path.push(node);
        if (node.value === value) return node;

        const leftSearch = this._searchNode(node.left, value, path);
        if (leftSearch) return leftSearch;

        return this._searchNode(node.right, value, path);
    }

    highlightTraversal(path, value) {
        let i = 0;
        const messageBox = document.getElementById('messageBox');
    
        document.querySelectorAll('.node').forEach(nodeDiv => {
            nodeDiv.classList.remove('highlight', 'found');
        });
    
        const interval = setInterval(() => {
            if (i > 0 && path[i - 1].div) path[i - 1].div.classList.remove('highlight');
    
            if (i < path.length && path[i].div) {
                const node = path[i];
                node.div.classList.add('highlight');
    
                if (node.value === value) {
                    node.div.classList.add('found');
                    clearInterval(interval);
                    messageBox.textContent = `Node with value ${value} found!`;
                    messageBox.classList.add('show');
    
                    setTimeout(() => {
                        messageBox.classList.remove('show');
                    }, 2000);
                }
                i++;
            } else {
                clearInterval(interval);
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
    resetTree() {
        this.root = null;  // Clears the tree
        this.draw();       // Redraws the empty tree
    }
    

    traversePreOrder(node) {
        const result = [];
        if (node) {
            result.push(node);  // Visit the current node first
            result.push(...this.traversePreOrder(node.left));  // Recursively visit the left child
            result.push(...this.traversePreOrder(node.right));  // Recursively visit the right child
        }
        return result;
    }
    
    traverseInOrder(node) {
        const result = [];
        if (node) {
            result.push(...this.traverseInOrder(node.left));  // Recursively visit the left child
            result.push(node);  // Visit the current node
            result.push(...this.traverseInOrder(node.right));  // Recursively visit the right child
        }
        return result;
    }
    
    traversePostOrder(node) {
        const result = [];
        if (node) {
            result.push(...this.traversePostOrder(node.left));  // Recursively visit the left child
            result.push(...this.traversePostOrder(node.right));  // Recursively visit the right child
            result.push(node);  // Visit the current node last
        }
        return result;
    }
}

// Instantiate Binary Tree
const binaryTree = new BinaryTree();

document.getElementById('valueInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        insertNode();  // Call insertNode() when "Enter" is pressed
    }
});

function insertNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        binaryTree.insert(value);
    }
}

function deleteNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        binaryTree.delete(value);
    }
}

function searchNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        binaryTree.search(value);
    }
}

// Pre-order Traversal
function preOrderTraversal() {
    const nodes = binaryTree.traversePreOrder(binaryTree.root);  // Get nodes in pre-order
    binaryTree.highlightTraversal(nodes);  // Highlight nodes during traversal
    displayTraversalResult('preOrderResult', nodes);  // Display traversal result
}

// In-order Traversal
function inOrderTraversal() {
    const nodes = binaryTree.traverseInOrder(binaryTree.root);  // Get nodes in in-order
    binaryTree.highlightTraversal(nodes);  // Highlight nodes during traversal
    displayTraversalResult('inOrderResult', nodes);  // Display traversal result
}

// Post-order Traversal
function postOrderTraversal() {
    const nodes = binaryTree.traversePostOrder(binaryTree.root);  // Get nodes in post-order
    binaryTree.highlightTraversal(nodes);  // Highlight nodes during traversal
    displayTraversalResult('postOrderResult', nodes);  // Display traversal result
}

// Helper function to display the result below the traversal type
function displayTraversalResult(resultId, nodes) {
    const resultDiv = document.getElementById(resultId);
    resultDiv.textContent = 'Traversal Result: ' + nodes.map(node => node.value).join(' -> ');
}


// Add this function to your existing JavaScript
function resetTree() {
    binaryTree.resetTree();  // Calls the reset method to clear the tree
}

