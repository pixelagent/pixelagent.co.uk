bl_info = {
    "name": "Export Collections as FBX (Unity Ready)",
    "blender": (4, 0, 0),
    "category": "Export",
    "author": "Pixelagent",
    "description": "Exports each top-level collection as a separate FBX with X/Y set to zero, for Unity integration",
}

import bpy
import os

def export_collection_as_fbx(collection, export_path):
    bpy.ops.object.select_all(action='DESELECT')

    duplicated_objects = []
    for obj in collection.all_objects:
        if obj and obj.type in {'MESH', 'EMPTY', 'ARMATURE'}:
            obj.select_set(True)
            bpy.context.view_layer.objects.active = obj
            bpy.ops.object.duplicate()
            dup = bpy.context.active_object
            dup.location.x = 0
            dup.location.y = 0
            duplicated_objects.append(dup)
            obj.select_set(False)

    if not duplicated_objects:
        return  # Skip empty collections

    # Create a temporary collection
    temp_collection = bpy.data.collections.new(name=f"Temp_{collection.name}")
    bpy.context.scene.collection.children.link(temp_collection)
    for obj in duplicated_objects:
        temp_collection.objects.link(obj)

    # Export FBX
    fbx_filename = os.path.join(export_path, f"{collection.name}.fbx")
    bpy.ops.object.select_all(action='DESELECT')
    for obj in duplicated_objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = duplicated_objects[0]

    bpy.ops.export_scene.fbx(
        filepath=fbx_filename,
        use_selection=True,
        apply_unit_scale=True,
        apply_scale_options='FBX_SCALE_ALL',
        object_types={'MESH', 'ARMATURE', 'EMPTY'},
        bake_space_transform=True,
        mesh_smooth_type='OFF',
        add_leaf_bones=False,
    )

    # Cleanup
    for obj in duplicated_objects:
        bpy.data.objects.remove(obj, do_unlink=True)
    bpy.data.collections.remove(temp_collection)

class ExportCollectionsFBXOperator(bpy.types.Operator):
    """Export each collection as a separate FBX with zeroed X/Y coordinates"""
    bl_idname = "export_scene.collections_as_fbx"
    bl_label = "Export Collections as FBX"
    bl_options = {'REGISTER', 'UNDO'}

    def execute(self, context):
        export_dir = os.path.dirname(bpy.data.filepath)
        if not export_dir:
            self.report({'ERROR'}, "Please save the Blender file first.")
            return {'CANCELLED'}

        scene = bpy.context.scene
        top_level_collections = scene.collection.children

        for collection in top_level_collections:
            export_collection_as_fbx(collection, export_dir)

        self.report({'INFO'}, "Export complete.")
        return {'FINISHED'}

def menu_func_export(self, context):
    self.layout.operator(ExportCollectionsFBXOperator.bl_idname, text="Export Collections as FBX (Unity Ready)")

def register():
    bpy.utils.register_class(ExportCollectionsFBXOperator)
    bpy.types.TOPBAR_MT_file_export.append(menu_func_export)

def unregister():
    bpy.utils.unregister_class(ExportCollectionsFBXOperator)
    bpy.types.TOPBAR_MT_file_export.remove(menu_func_export)

if __name__ == "__main__":
    register()
