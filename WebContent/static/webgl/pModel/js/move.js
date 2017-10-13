function moveModel(Tileset, TMoveX, TMoveY, TMoveZ, THeading, TPitch, TRoll, TScaleX, TScaleY, TScaleZ) {
    var tileset = Tileset;
    var oldMat = FreeDo.clone(FreeDo.Matrix4.IDENTITY, true);

    //--------------计算球面移动所需数据
    var oldT = FreeDo.clone(tileset._root.computedTransform, true);
    var basePt = FreeDo.Matrix4.getTranslation(oldT, new FreeDo.Cartesian3());

    var center = Freedo.Cartographic.fromCartesian(basePt);
    var rio = window.getLongAndLatRatio(center);

    var startPt3 = FreeDo.clone(basePt, true);
    var endPt3 = Freedo.Cartesian3.fromRadians(center.longitude + TMoveX * rio[0], center.latitude + TMoveY * rio[1], center.height + parseFloat(TMoveZ));

    var translation = FreeDo.Cartesian3.subtract(endPt3, startPt3, new FreeDo.Cartesian3());
    var matTran = FreeDo.Matrix4.fromTranslation(translation);

    //--------------平移到坐标原点
    var initMatrix4 = FreeDo.clone(tileset._root.transform, true);
    var inver4 = FreeDo.Matrix4.inverse(initMatrix4, new FreeDo.Matrix4());
    tileset.modelMatrix = Freedo.Matrix4.multiply(inver4, oldMat, new FreeDo.Matrix4());

    //--------------处理轴向缩放
    oldT = FreeDo.clone(tileset._root.computedTransform, true);
    basePt = FreeDo.Matrix4.getTranslation(oldT, new FreeDo.Cartesian3());
    oldMat = FreeDo.clone(tileset.modelMatrix, true);
    v12 = (1 - TScaleX) * (basePt.x);
    v13 = (1 - TScaleY) * (basePt.y);
    v14 = (1 - TScaleZ) * (basePt.z);
    rMatrix4 = Freedo.Matrix4.fromTranslationQuaternionRotationScale(
            new Freedo.Cartesian3(v12, v13, v14), // translation
            Freedo.Quaternion.IDENTITY, // rotation
            new Freedo.Cartesian3(TScaleX, TScaleY, TScaleZ), // scale
            new FreeDo.Matrix4());
    tileset.modelMatrix = Freedo.Matrix4.multiply(rMatrix4, oldMat, new FreeDo.Matrix4());

    //--------------处理旋转
    var rTHeading = Freedo.Math.toRadians(THeading);
    var rTPitch = Freedo.Math.toRadians(TPitch);
    var rTRoll = Freedo.Math.toRadians(TRoll);
    oldMat = FreeDo.clone(tileset.modelMatrix, true);
    rMatrix4 = Freedo.Matrix4.fromTranslationQuaternionRotationScale(
            new Freedo.Cartesian3(0, 0, 0), // translation
            Freedo.Quaternion.fromHeadingPitchRoll(new Freedo.HeadingPitchRoll(rTHeading, rTPitch, rTRoll), new FreeDo.Quaternion()), // rotation
            new Freedo.Cartesian3(1, 1, 1), // scale
            new FreeDo.Matrix4());
    tileset.modelMatrix = Freedo.Matrix4.multiply(rMatrix4, oldMat, new FreeDo.Matrix4());

    //--------------还原到原来的位置
    oldMat = FreeDo.clone(tileset.modelMatrix, true);
    tileset.modelMatrix = Freedo.Matrix4.multiply(initMatrix4, oldMat, new FreeDo.Matrix4());

    //--------------处理球面移动
    var v12 = matTran[12];
    var v13 = matTran[13];
    var v14 = matTran[14];

    oldMat = FreeDo.clone(tileset.modelMatrix, true);
    var rMatrix4 = Freedo.Matrix4.fromTranslationQuaternionRotationScale(
            new Freedo.Cartesian3(v12, v13, v14), // translation
            Freedo.Quaternion.IDENTITY, // rotation
            new Freedo.Cartesian3(1, 1, 1), // scale
            new FreeDo.Matrix4());
    tileset.modelMatrix = Freedo.Matrix4.multiply(rMatrix4, oldMat, new FreeDo.Matrix4());
    return Freedo.clone(tileset.modelMatrix, true);
}
function getLongAndLatRatio(cartPos) {
    var egLong = new FreeDo.EllipsoidGeodesic();
    var endLongPos = cartPos.clone();
    endLongPos.longitude += 0.1;
    egLong.setEndPoints(cartPos, endLongPos);
    var longRatio = 0.1 / egLong.surfaceDistance;

    var egLat = new FreeDo.EllipsoidGeodesic();
    var endLatPos = cartPos.clone();
    endLatPos.latitude += 0.1;
    egLat.setEndPoints(cartPos, endLatPos);
    var latRatio = 0.1 / egLat.surfaceDistance;

    return [longRatio, latRatio];
}