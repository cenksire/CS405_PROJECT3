/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        function applyTransformation(matrix, transformationMatrix) {
            return MatrixMult(matrix, transformationMatrix);
        }
    
        const currentTransformationMatrix = this.trs.getTransformationMatrix();
        var transformedMvp = applyTransformation(mvp, currentTransformationMatrix);
        var transformedModelView = applyTransformation(modelView, currentTransformationMatrix);
        var transformedNormals = applyTransformation(normalMatrix, currentTransformationMatrix);
        var transformedModel = applyTransformation(modelMatrix, currentTransformationMatrix);
    
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
            this.children.forEach(child => child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel));
        }
    }
    
    
    

}