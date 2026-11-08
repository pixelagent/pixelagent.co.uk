import bpy, bmesh, math, os, sys
from mathutils import Vector, Euler

OUT_BLEND = os.path.join(os.path.dirname(__file__), "blender")
OUT_GLB = os.path.join(os.path.dirname(__file__), "glb")
os.makedirs(OUT_BLEND, exist_ok=True)
os.makedirs(OUT_GLB, exist_ok=True)

def clear():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def mat(name, color, rough=0.85, metallic=0.0, emission=None, emit_strength=0.0, alpha=1.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color[:3], 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission[:3], 1)
        try: bsdf.inputs["Emission Strength"].default_value = emit_strength
        except Exception: pass
    if alpha < 1.0:
        bsdf.inputs["Alpha"].default_value = alpha
        m.blend_method = 'BLEND'
    return m

def assign(obj, material):
    if obj.data.materials: obj.data.materials[0] = material
    else: obj.data.materials.append(material)

def add_mesh(name, mesh_data):
    obj = bpy.data.objects.new(name, mesh_data)
    bpy.context.collection.objects.link(obj)
    return obj

def uv_sphere(name, r, seg=16, ring=10, loc=(0,0,0), scale=(1,1,1)):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, segments=seg, ring_count=ring, location=loc)
    o=bpy.context.active_object; o.name=name; o.scale=scale; bpy.ops.object.transform_apply(scale=True); return o

def cylinder(name, r, depth, verts=12, loc=(0,0,0), rot=(0,0,0), scale=(1,1,1)):
    bpy.ops.mesh.primitive_cylinder_add(radius=r, depth=depth, vertices=verts, location=loc, rotation=rot)
    o=bpy.context.active_object; o.name=name; o.scale=scale; bpy.ops.object.transform_apply(scale=True); return o

def cone(name, r1, r2, depth, verts=12, loc=(0,0,0), rot=(0,0,0)):
    bpy.ops.mesh.primitive_cone_add(radius1=r1, radius2=r2, depth=depth, vertices=verts, location=loc, rotation=rot)
    o=bpy.context.active_object; o.name=name; return o

def cube(name, size, loc=(0,0,0), scale=(1,1,1), rot=(0,0,0)):
    bpy.ops.mesh.primitive_cube_add(size=size, location=loc, rotation=rot)
    o=bpy.context.active_object; o.name=name; o.scale=scale; bpy.ops.object.transform_apply(scale=True); return o

def plane(name, size, loc=(0,0,0), rot=(0,0,0), scale=(1,1,1)):
    bpy.ops.mesh.primitive_plane_add(size=size, location=loc, rotation=rot)
    o=bpy.context.active_object; o.name=name; o.scale=scale; bpy.ops.object.transform_apply(scale=True); return o

def icosphere(name, r, sub=2, loc=(0,0,0), scale=(1,1,1)):
    bpy.ops.mesh.primitive_ico_sphere_add(radius=r, subdivisions=sub, location=loc)
    o=bpy.context.active_object; o.name=name; o.scale=scale; bpy.ops.object.transform_apply(scale=True); return o

def shade_smooth(obj):
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.shade_smooth()
    obj.select_set(False)

def parent_all(children, name):
    bpy.ops.object.empty_add(type='PLAIN_AXES', location=(0,0,0))
    root=bpy.context.active_object; root.name=name
    for c in children:
        c.parent = root
    return root

def export_all(name):
    # select all mesh/empty
    bpy.ops.object.select_all(action='SELECT')
    blend = os.path.join(OUT_BLEND, f"{name}.blend")
    glb = os.path.join(OUT_GLB, f"{name}.glb")
    bpy.ops.wm.save_as_mainfile(filepath=blend)
    bpy.ops.export_scene.gltf(filepath=glb, export_format='GLB', use_selection=False, export_apply=True,
                              export_texcoords=True, export_normals=True, export_materials='EXPORT')
    print('EXPORTED', name)

def make_wanderer():
    clear()
    robe=mat('Robe',(0.42,0.52,0.72),0.9)
    skin=mat('Skin',(0.78,0.62,0.48),0.7)
    cloth=mat('Cloth',(0.62,0.54,0.38),0.95)
    hair=mat('Hair',(0.18,0.12,0.08),0.8)
    eye=mat('Eye',(0.95,0.95,0.95),0.3)
    pupil=mat('Pupil',(0.05,0.05,0.05),0.2)
    parts=[]
    body=cylinder('Body',0.34,0.85,16,(0,0,0.52)); shade_smooth(body); assign(body,robe); parts.append(body)
    skirt=cone('Skirt',0.52,0.30,0.55,16,(0,0,0.2)); shade_smooth(skirt); assign(skirt,robe); parts.append(skirt)
    torso=uv_sphere('Torso',0.30,16,10,(0,0,0.95),scale=(1,0.9,1.1)); shade_smooth(torso); assign(torso,cloth); parts.append(torso)
    head=uv_sphere('Head',0.26,16,12,(0,0,1.38)); shade_smooth(head); assign(head,skin); parts.append(head)
    h=uv_sphere('HairCap',0.265,16,10,(0,0,1.43),scale=(1,1,0.75)); shade_smooth(h); assign(h,hair); parts.append(h)
    for sx in (-0.09,0.09):
        e=uv_sphere('Eye',0.045,10,8,(sx,0.22,1.40)); assign(e,eye); parts.append(e)
        p=uv_sphere('Pupil',0.022,8,6,(sx,0.255,1.40)); assign(p,pupil); parts.append(p)
    for sx,ang in ((-0.42,0.35),(0.42,-0.35)):
        arm=cylinder('Arm',0.07,0.55,8,(sx,0,0.95),rot=(0,ang,0)); shade_smooth(arm); assign(arm,cloth); parts.append(arm)
        hand=uv_sphere('Hand',0.075,10,8,(sx*1.45,0,0.72)); shade_smooth(hand); assign(hand,skin); parts.append(hand)
    for sx in (-0.14,0.14):
        leg=cylinder('Leg',0.085,0.35,8,(sx,0,0.18)); shade_smooth(leg); assign(leg,robe); parts.append(leg)
        foot=uv_sphere('Foot',0.10,10,8,(sx,0.08,0.03),scale=(1,1.3,0.6)); shade_smooth(foot); assign(foot,hair); parts.append(foot)
    staff=cylinder('Staff',0.03,1.7,8,(0.52,0.05,0.85),rot=(0,0.18,0)); assign(staff,mat('Wood',(0.38,0.26,0.14),0.9)); parts.append(staff)
    parent_all(parts,'Wanderer')
    export_all('wanderer')

def make_tent():
    clear()
    canvas=mat('Canvas',(0.84,0.76,0.58),0.95)
    dark=mat('CanvasDark',(0.72,0.62,0.44),0.95)
    wood=mat('Pole',(0.35,0.24,0.14),0.9)
    parts=[]
    # tent body as stretched cone-like prism
    bpy.ops.mesh.primitive_cone_add(vertices=4, radius1=1.35, radius2=0.05, depth=1.8, location=(0,0,0.9))
    body=bpy.context.active_object; body.name='TentBody'; body.scale=(1.15,0.85,1); bpy.ops.object.transform_apply(scale=True)
    body.rotation_euler=(0,0,math.pi/4); bpy.ops.object.transform_apply(rotation=True)
    shade_smooth(body); assign(body,canvas); parts.append(body)
    # entrance flap
    flap=cube('Flap',1,(0,-0.95,0.55),scale=(0.55,0.05,0.55)); assign(flap,dark); parts.append(flap)
    pole=cylinder('Pole',0.04,2.15,8,(0,0,1.05)); assign(pole,wood); parts.append(pole)
    for x,y in [(-1.0,0.55),(1.0,0.55),(-1.0,-0.55),(1.0,-0.55)]:
        peg=cylinder('Peg',0.03,0.25,6,(x,y,0.1),rot=(0.4 if y>0 else -0.4,0,0)); assign(peg,wood); parts.append(peg)
    parent_all(parts,'Tent')
    export_all('tent')

def make_campfire():
    clear()
    stone=mat('Stone',(0.35,0.33,0.30),0.95)
    logm=mat('Log',(0.28,0.18,0.10),0.9)
    ember=mat('Ember',(1.0,0.35,0.05),0.6,emission=(1.0,0.25,0.02),emit_strength=2.5)
    parts=[]
    for i in range(10):
        a=i/10*math.tau; r=0.55
        s=icosphere('Stone',0.16+ (i%3)*0.03,1,(math.cos(a)*r,math.sin(a)*r,0.08),scale=(1,0.8,0.6))
        shade_smooth(s); assign(s,stone); parts.append(s)
    for i,(rot,z) in enumerate([( (0.2,0.8,1.57),0.14), ((-0.15,-0.6,1.57),0.18), ((0.4,0.1,1.57),0.12)]):
        l=cylinder('Log',0.07,1.0,8,(0,0,z),rot=rot); shade_smooth(l); assign(l,logm); parts.append(l)
    e=icosphere('Embers',0.22,2,(0,0,0.28),scale=(1,1,0.5)); shade_smooth(e); assign(e,ember); parts.append(e)
    parent_all(parts,'Campfire')
    export_all('campfire')

def make_market_stall():
    clear()
    wood=mat('Wood',(0.45,0.30,0.16),0.9)
    cloth=mat('Awning',(0.78,0.58,0.22),0.95)
    cloth2=mat('Awning2',(0.65,0.45,0.15),0.95)
    crate=mat('Crate',(0.55,0.38,0.20),0.92)
    parts=[]
    top=cube('Counter',1,(0,0,0.78),scale=(2.1,1.1,0.12)); assign(top,wood); parts.append(top)
    for x,y in [(-0.85,0.4),(0.85,0.4),(-0.85,-0.4),(0.85,-0.4)]:
        p=cylinder('Leg',0.06,0.78,8,(x,y,0.39)); assign(p,wood); parts.append(p)
    for x in (-0.9,0.9):
        post=cylinder('Post',0.05,1.35,8,(x,0,1.45)); assign(post,wood); parts.append(post)
    aw=cube('Awning',1,(0,0.05,2.05),scale=(2.25,1.25,0.06),rot=(-0.18,0,0)); assign(aw,cloth); parts.append(aw)
    trim=cube('Trim',1,(0,0.62,1.92),scale=(2.25,0.12,0.12)); assign(trim,cloth2); parts.append(trim)
    for i,(x,y,zp) in enumerate([(-0.55,0,0.95),(0.55,-0.05,0.95)]):
        b=cube(f'Crate{i}',0.32,(x,y,zp)); assign(b,crate); parts.append(b)
    parent_all(parts,'MarketStall')
    export_all('market_stall')

def make_palm_tree():
    clear()
    trunkm=mat('Trunk',(0.52,0.38,0.22),0.95)
    leafm=mat('Leaf',(0.18,0.52,0.22),0.85)
    parts=[]
    # curved trunk via stacked segments
    for i in range(7):
        t=i/6; z=0.25+i*0.48; x=math.sin(t*0.6)*0.18
        seg=cylinder(f'Trunk{i}',0.22-i*0.015,0.52,10,(x,0,z),rot=(0,0.08*t,0)); shade_smooth(seg); assign(seg,trunkm); parts.append(seg)
    topx=math.sin(0.6)*0.18; topz=0.25+6*0.48+0.2
    for i in range(8):
        a=i/8*math.tau
        bpy.ops.mesh.primitive_plane_add(size=1, location=(topx+math.cos(a)*0.85,math.sin(a)*0.85,topz-0.1), rotation=(1.15,0,a))
        lf=bpy.context.active_object; lf.name=f'Leaf{i}'; lf.scale=(0.28,1.15,1); bpy.ops.object.transform_apply(scale=True)
        shade_smooth(lf); assign(lf,leafm); parts.append(lf)
        # simple thickness
        mod=lf.modifiers.new('Solid','SOLIDIFY'); mod.thickness=0.04; bpy.context.view_layer.objects.active=lf; lf.select_set(True); bpy.ops.object.modifier_apply(modifier='Solid'); lf.select_set(False)
    parent_all(parts,'PalmTree')
    export_all('palm_tree')

def make_acacia():
    clear()
    trunkm=mat('Trunk',(0.34,0.24,0.14),0.95)
    leafm=mat('Canopy',(0.36,0.50,0.20),0.9)
    parts=[]
    tr=cylinder('Trunk',0.22,2.1,10,(0,0,1.05)); shade_smooth(tr); assign(tr,trunkm); parts.append(tr)
    # canopy umbrella
    for dx,dy,s in [(0,0,1.35),(-0.55,0.2,0.75),(0.55,-0.15,0.8),(0,0.55,0.7)]:
        c=uv_sphere('Canopy',1.0,14,10,(dx,dy,2.55),scale=(s, s, s*0.45)); shade_smooth(c); assign(c,leafm); parts.append(c)
    for ang in (0.5,-0.6,2.2):
        br=cylinder('Branch',0.07,1.1,8,(math.cos(ang)*0.35,math.sin(ang)*0.35,1.9),rot=(0.9,0,ang)); shade_smooth(br); assign(br,trunkm); parts.append(br)
    parent_all(parts,'AcaciaTree')
    export_all('acacia_tree')

def make_rock():
    clear()
    stone=mat('Rock',(0.50,0.46,0.40),0.98)
    parts=[]
    r=icosphere('Rock',1.0,2,(0,0,0.55),scale=(1.1,0.9,0.65)); shade_smooth(r); assign(r,stone)
    # displace a bit
    tex=bpy.data.textures.new('RockNoise','CLOUDS')
    mod=r.modifiers.new('Displace','DISPLACE'); mod.texture=tex; mod.strength=0.18
    bpy.context.view_layer.objects.active=r; r.select_set(True); bpy.ops.object.modifier_apply(modifier='Displace'); r.select_set(False)
    parts.append(r)
    parent_all(parts,'Rock')
    export_all('rock')

def make_split_rock():
    clear()
    stone=mat('Rock',(0.46,0.40,0.34),0.98)
    dark=mat('RockDark',(0.34,0.30,0.26),0.98)
    water=mat('Water',(0.20,0.55,0.75),0.2,metallic=0.0,emission=(0.05,0.2,0.3),emit_strength=0.4,alpha=0.75)
    parts=[]
    for sx in (-0.55,0.55):
        b=icosphere('Boulder',1.25,2,(sx,0,0.9),scale=(0.85,1.0,1.25)); shade_smooth(b); assign(b,stone)
        tex=bpy.data.textures.new(f'N{sx}','CLOUDS')
        mod=b.modifiers.new('Displace','DISPLACE'); mod.texture=tex; mod.strength=0.22
        bpy.context.view_layer.objects.active=b; b.select_set(True); bpy.ops.object.modifier_apply(modifier='Displace'); b.select_set(False)
        parts.append(b)
    # split crevice hint
    crack=cube('Crack',1,(0,0,0.55),scale=(0.08,0.9,0.8)); assign(crack,dark); parts.append(crack)
    pool=cylinder('Pool',0.75,0.08,20,(0,0.9,0.04)); assign(pool,water); parts.append(pool)
    parent_all(parts,'SplitRock')
    export_all('split_rock')

def make_shrine():
    clear()
    stone=mat('Stone',(0.78,0.72,0.58),0.92)
    trim=mat('Trim',(0.62,0.52,0.34),0.9)
    gold=mat('Gold',(0.85,0.68,0.20),0.35,metallic=0.8)
    parts=[]
    base=cube('Base',1,(0,0,0.25),scale=(5.2,5.2,0.5)); assign(base,trim); parts.append(base)
    floor=cube('Floor',1,(0,0,0.55),scale=(4.6,4.6,0.2)); assign(floor,stone); parts.append(floor)
    roof=cube('Roof',1,(0,0,2.35),scale=(5.4,5.4,0.35)); assign(roof,trim); parts.append(roof)
    for x in (-1.6,-0.53,0.53,1.6):
        for y in (-1.6,1.6):
            col=cylinder('Pillar',0.18,1.55,12,(x,y,1.42)); shade_smooth(col); assign(col,stone); parts.append(col)
    # inner ark-like chest
    chest=cube('Chest',1,(0,0,1.0),scale=(1.2,0.7,0.55)); assign(chest,gold); parts.append(chest)
    lid=cube('Lid',1,(0,0,1.35),scale=(1.25,0.75,0.12)); assign(lid,gold); parts.append(lid)
    parent_all(parts,'Shrine')
    export_all('shrine')

def make_oasis():
    clear()
    water=mat('Water',(0.16,0.52,0.72),0.15,emission=(0.03,0.18,0.28),emit_strength=0.5,alpha=0.8)
    sand=mat('Sand',(0.82,0.72,0.50),0.98)
    trunkm=mat('Trunk',(0.52,0.38,0.22),0.95)
    leafm=mat('Leaf',(0.18,0.52,0.22),0.85)
    reed=mat('Reed',(0.35,0.55,0.22),0.9)
    parts=[]
    bank=cylinder('Bank',2.2,0.18,24,(0,0,0.05),scale=(1.2,1,1)); shade_smooth(bank); assign(bank,sand); parts.append(bank)
    pool=cylinder('Pool',1.55,0.10,28,(0,0,0.08),scale=(1.15,0.95,1)); assign(pool,water); parts.append(pool)
    # two palms
    for px,py,s in [(-1.4,-0.9,0.85),(1.3,1.0,0.72)]:
        for i in range(6):
            t=i/5; z=0.2+i*0.38*s; x=px+math.sin(t*0.5)*0.12
            seg=cylinder('Tr',0.14*s-i*0.008,0.42*s,8,(x,py,z),rot=(0,0.06*t,0)); shade_smooth(seg); assign(seg,trunkm); parts.append(seg)
        tx=px+math.sin(0.5)*0.12; tz=0.2+5*0.38*s+0.12
        for i in range(7):
            a=i/7*math.tau
            bpy.ops.mesh.primitive_plane_add(size=1, location=(tx+math.cos(a)*0.55*s,py+math.sin(a)*0.55*s,tz-0.05), rotation=(1.2,0,a))
            lf=bpy.context.active_object; lf.scale=(0.18*s,0.8*s,1); bpy.ops.object.transform_apply(scale=True)
            mod=lf.modifiers.new('S','SOLIDIFY'); mod.thickness=0.03; bpy.context.view_layer.objects.active=lf; lf.select_set(True); bpy.ops.object.modifier_apply(modifier='S'); lf.select_set(False)
            shade_smooth(lf); assign(lf,leafm); parts.append(lf)
    for i in range(6):
        a=i/6*math.tau+0.2; r=1.75
        re=cylinder('Reed',0.03,0.55,5,(math.cos(a)*r,math.sin(a)*r,0.32),rot=(0.15*math.cos(a),0.15*math.sin(a),0))
        assign(re,reed); parts.append(re)
    parent_all(parts,'Oasis')
    export_all('oasis')

def make_manna():
    clear()
    m=mat('Manna',(0.98,0.95,0.82),0.35,emission=(0.95,0.90,0.65),emit_strength=1.2)
    parts=[]
    core=icosphere('Core',0.32,2,(0,0,0.4)); shade_smooth(core); assign(core,m); parts.append(core)
    ring=bpy.ops.mesh.primitive_torus_add(major_radius=0.42, minor_radius=0.04, location=(0,0,0.4), rotation=(1.57,0,0))
    r=bpy.context.active_object; assign(r,mat('Ring',(0.95,0.85,0.45),0.3,metallic=0.5)); parts.append(r)
    parent_all(parts,'MannaPickup')
    export_all('manna_pickup')

def make_water_pickup():
    clear()
    m=mat('WaterOrb',(0.25,0.65,0.95),0.1,emission=(0.12,0.35,0.65),emit_strength=0.9,alpha=0.85)
    o=uv_sphere('Water',0.34,20,14,(0,0,0.42)); shade_smooth(o); assign(o,m)
    parent_all([o],'WaterPickup')
    export_all('water_pickup')

def make_banner():
    clear()
    wood=mat('Pole',(0.38,0.26,0.15),0.9)
    cloth=mat('Banner',(0.72,0.18,0.16),0.9)
    gold=mat('Finial',(0.85,0.68,0.20),0.35,metallic=0.8)
    parts=[]
    pole=cylinder('Pole',0.06,3.6,10,(0,0,1.8)); assign(pole,wood); parts.append(pole)
    fin=uv_sphere('Finial',0.12,12,8,(0,0,3.68)); assign(fin,gold); parts.append(fin)
    b=cube('Banner',1,(0.55,0,3.0),scale=(1.0,0.04,0.75)); assign(b,cloth); parts.append(b)
    parent_all(parts,'Banner')
    export_all('banner')

if __name__ == '__main__':
    make_wanderer(); make_tent(); make_campfire(); make_market_stall()
    make_palm_tree(); make_acacia(); make_rock(); make_split_rock()
    make_shrine(); make_oasis(); make_manna(); make_water_pickup(); make_banner()
    print('ALL_DONE')
