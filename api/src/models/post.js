import _ from 'lodash'


class Post{

    constructor(app){

        this.app=app;

        this.model={
            from:null,
            to:null,
            message: null,
            phone:null,
            files: [],
            created: new Date(),


        }
    }

    initWithObject(obj){

        this.model.from=_.get(obj,'from');
        this.model.to=_.get(obj,'to');
        this.model.message=_.get(obj,'message');
        this.model.phone=_.get(obj,'phone');
        this.model.files=_.get(obj,'files',[]);
        this.model.created=_.get(obj,'created',new Date());

        return this;


    }
    toJSON(){


        return this.model;

    }
}
export default Post;
``