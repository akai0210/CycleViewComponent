// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
type cardType = {
    zIndex: number,
    scale: number,
    opacity: number,
    pos: cc.Vec2,
}
@ccclass
export default class Revolve extends cc.Component {

    private _cardList: Array<cardType> = [];
    private _nodeChildrenList: Array<any> = [];
    private _revolveTime: number = 0.8;
    onLoad() {
        this._cardList = [
            {
                zIndex: 3,
                scale: 1,
                opacity: 255,
                pos: this.node.children[0].position,
            },
            {
                zIndex: 2,
                scale: 0.8,
                opacity: 180,
                pos: this.node.children[1].position,
            },
            {
                zIndex: 1,
                scale: 0.5,
                opacity: 100,
                pos: this.node.children[2].position,
            },
            {
                zIndex: 0,
                scale: 0.2,
                opacity: 30,
                pos: this.node.children[3].position,
            },
            {
                zIndex: 1,
                scale: 0.5,
                opacity: 100,
                pos: this.node.children[4].position,
            },
            {
                zIndex: 1,
                scale: 0.8,
                opacity: 180,
                pos: this.node.children[5].position,
            },
        ]

        this._nodeChildrenList = this.node.children;
        for (let index = 0; index < this._cardList.length; index++) {
            this._nodeChildrenList[index].num = index;
            const element = this._cardList[index];
            this.node.children[index].zIndex = element.zIndex;
            this.node.children[index].scale = element.scale;
            this.node.children[index].opacity = element.opacity;
        }

        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._movePos, this);
    }

    onEnable() {

    }

    start() {

    }

    private _movePos(event: cc.Event.EventTouch): void {
        let _deltaX: number = event.touch.getDelta().x;
        // 首先判断动作是否执行完
        for (let i = 0; i < this._nodeChildrenList.length; i++) {
            if (this._nodeChildrenList[i].getActionByTag(1))
                return;
        }
        if (_deltaX < 0) {
            this._revolveLeft();
        } else {
            this._revolveRight();
        }
    }


    private _revolveLeft(): void {
        for (let i = 0; i < this._nodeChildrenList.length; i++) {

            if (this._nodeChildrenList[i].num > 0) {
                this._nodeChildrenList[i].num -= 1;
            } else {
                this._nodeChildrenList[i].num = this._nodeChildrenList.length - 1;
            }

            //获取目标属性
            let _carddata: cardType = this._cardList[this._nodeChildrenList[i].num];
            //改变Z值
            this._nodeChildrenList[i].zIndex = _carddata.zIndex;

            //改变动作
            let _scaleAction = cc.scaleTo(this._revolveTime, _carddata.scale);
            let _fadeAction = cc.fadeTo(this._revolveTime, _carddata.opacity);
            let _moveAction = cc.moveTo(this._revolveTime, _carddata.pos);
            let spawnAction = cc.spawn(_scaleAction, _fadeAction, _moveAction);
            spawnAction.setTag(1);      // 设置动作标签
            this._nodeChildrenList[i].runAction(spawnAction);
        }
    }


    private _revolveRight(): void {
        for (let i = 0; i < this._nodeChildrenList.length; i++) {
            if (this._nodeChildrenList[i].num < this._nodeChildrenList.length - 1) {
                this._nodeChildrenList[i].num += 1;
            } else {
                this._nodeChildrenList[i].num = 0;
            }

            //获取目标属性
            let _carddata: cardType = this._cardList[this._nodeChildrenList[i].num];

            //改变Z值
            this._nodeChildrenList[i].zIndex = _carddata.zIndex;
            //改变动作
            let _scaleAction = cc.scaleTo(this._revolveTime, _carddata.scale);
            let _fadeAction = cc.fadeTo(this._revolveTime, _carddata.opacity);
            let _moveAction = cc.moveTo(this._revolveTime, _carddata.pos);
            let spawnAction = cc.spawn(_scaleAction, _fadeAction, _moveAction);
            spawnAction.setTag(1);      // 设置动作标签
            this._nodeChildrenList[i].runAction(spawnAction);
        }
    }

}

