class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }
        this.draw();
    }

    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this._insertNode(node.left, newNode);
            }
        } else if (newNode.value > node.value) {  // Prevent duplicates
            if (!node.right) {
                node.right = newNode;
            } else {
                this._insertNode(node.right, newNode);
            }
        }
    }

    delete(value) {
        const path = [];
        const nodeToDelete = this._searchNode(this.root, value, path); // Find the path first
        if (nodeToDelete) {
            this.highlightTraversalForDelete(path, value, () => {
                // Once traversal animation is done, proceed with deletion
                this.root = this._deleteNode(this.root, value, path);
                this.draw(); // Redraw the tree after deletion
            });
        } else {
            // If node is not found, show a message
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = `Node with value ${value} not found for deletion.`;
            messageDiv.classList.remove('hidden');
            messageDiv.classList.add('show');
            setTimeout(() => {
                messageDiv.classList.remove('show');
            }, 3000);
        }
    }
    
    _deleteNode(node, value, path) {
        if (!node) return null;
        path.push(node);  // Add the current node to the path for highlighting
    
        if (value < node.value) {
            node.left = this._deleteNode(node.left, value, path);
        } else if (value > node.value) {
            node.right = this._deleteNode(node.right, value, path);
        } else {
            // Node to be deleted is found
            if (!node.left && !node.right) {
                // Case 1: Node has no children (leaf node)
                return null;
            }
            if (!node.left) {
                // Case 2: Node has only right child
                return node.right;
            }
            if (!node.right) {
                // Case 3: Node has only left child
                return node.left;
            }
    
            // Case 4: Node has two children
            let minValueNode = this._findMinNode(node.right);  // Find the in-order successor
            node.value = minValueNode.value;  // Replace node's value with in-order successor value
    
            // Now delete the in-order successor
            node.right = this._deleteNode(node.right, minValueNode.value, path);
        }
    
        return node;
    }
    
    _findMinNode(node) {
        while (node.left) node = node.left;
        return node;
    }
    
    
    
    
    highlightTraversalForDelete(path, value, callback) {
        let i = 0;
    
        // Clear previous highlights
        document.querySelectorAll('.node').forEach(nodeDiv => {
            nodeDiv.classList.remove('highlight', 'found');
        });
    
        const messageDiv = document.getElementById('message');
        messageDiv.classList.add('hidden');  // Hide any previous messages
    
        const interval = setInterval(() => {
            if (i > 0) path[i - 1].div.classList.remove('highlight');  // Remove highlight from previous node
    
            if (i < path.length) {
                const node = path[i];
                node.div.classList.add('highlight');  // Highlight current node
    
                if (node.value === value) {  // Node to be deleted found
                    node.div.classList.add('found');  // Mark the found node
    
                    setTimeout(() => {
                        messageDiv.textContent = `Node with value ${value} deleted!`;
                        messageDiv.classList.remove('hidden');
                        messageDiv.classList.add('show');
                        callback(); // Proceed with deletion after animation
                    }, 500);  // Delay before deletion message
    
                    clearInterval(interval);  // Stop animation
    
                }
                i++;
            } else {
                clearInterval(interval);
                messageDiv.textContent = `Node with value ${value} not found for deletion.`;
                messageDiv.classList.remove('hidden');
                messageDiv.classList.add('show');
                setTimeout(() => {
                    messageDiv.classList.remove('show');
                }, 3000);
            }
        }, 500);  // Delay between steps in animation
    }
    
    
    

    _findMin(node) {
        while (node.left) node = node.left;
        return node.value;
    }

    // Search method to find a value in the BST
        // ... other methods
    
        search(value) {
            const traversalPath = [];  // Array to store traversal path
            const foundNode = this._searchNode(this.root, value, traversalPath);
            this.highlightTraversal(traversalPath, value);  // Start traversal animation
        }
    
        _searchNode(node, value, path) {
            if (!node) return null;
            path.push(node);  // Add node to path for animation
            if (value === node.value) return node;
            if (value < node.value) {
                return this._searchNode(node.left, value, path);
            } else {
                return this._searchNode(node.right, value, path);
            }
        }
    
        highlightTraversal(path, value) {
            let i = 0;
            const messageBox = document.getElementById('messageBox');
        
            // Clear any previous highlights
            document.querySelectorAll('.node').forEach(nodeDiv => {
                nodeDiv.classList.remove('highlight', 'found');
            });
        
            const interval = setInterval(() => {
                if (i > 0) path[i - 1].div.classList.remove('highlight');  // Unhighlight previous node
        
                if (i < path.length) {
                    const node = path[i];
                    node.div.classList.add('highlight');  // Highlight current node
                    
                    if (node.value === value) {
                        node.div.classList.add('found');  // Mark as found if the value matches
                        clearInterval(interval);  // Stop animation once found
        
                        // Show the "Node found" message
                        messageBox.classList.add('show');
        
                        // Hide the message after 2 seconds
                        setTimeout(() => {
                            messageBox.classList.remove('show');
                        }, 2000);
                    }
        
                    i++;
                } else {
                    clearInterval(interval);  // Stop animation if not found
                }
            }, 500);  // Adjust delay as desired for animation speed
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

// Instantiate BST
const bst = new BinarySearchTree();

document.getElementById('valueInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        insertNode();  // Call insertNode when Enter is pressed
    }
});


function insertNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        bst.insert(value);
    }
}

function deleteNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        bst.delete(value);
    }
}

function searchNode() {
    const value = Number(document.getElementById('valueInput').value);
    if (!isNaN(value)) {
        bst.search(value);
    }
}

function preOrderTraversal() {
    const nodes = bst.traversePreOrder(bst.root);
    bst.highlightTraversal(nodes);
    displayTraversalResult('preOrderResult', nodes);
}

function inOrderTraversal() {
    const nodes = bst.traverseInOrder(bst.root);
    bst.highlightTraversal(nodes);
    displayTraversalResult('inOrderResult', nodes);
}

function postOrderTraversal() {
    const nodes = bst.traversePostOrder(bst.root);
    bst.highlightTraversal(nodes);
    displayTraversalResult('postOrderResult', nodes);
}

// Helper function to display the result below the traversal type
function displayTraversalResult(resultId, nodes) {
    const resultDiv = document.getElementById(resultId);
    resultDiv.textContent = 'Traversal Result: ' + nodes.map(node => node.value).join(' -> ');
}


function resetTree() {
    bst.root = null;  // Clear the tree structure
    document.getElementById('tree-container').innerHTML = '';  // Clear the tree visualization
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.classList.remove('show');
        messageBox.textContent = '';
    }
}

