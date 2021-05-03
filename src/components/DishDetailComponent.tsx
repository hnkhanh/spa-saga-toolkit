import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { required, maxLength, minLength } from "./ContactComponent";
// import { FadeTransform } from "react-animation-components";
import { useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../redux/store/hooks";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../redux/reducers/comments";

export type comment = {
  id: number;
  dishId: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
};
type values = {
  rating: number;
  author: string;
  comment: string;
  id: number;
};

const CommentForm: React.FC<{ dishId: number }> = ({ dishId }): JSX.Element => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSubmit = (values: values) => {
    const { rating, author, comment } = values;
    let date: string = new Date().toISOString();
    dispatch(addComment({ dishId, rating, author, comment, date }));
  };

  return (
    <div className="col-12">
      <Button outline onClick={toggleModal} className="mt-3 mb-3 comment">
        Post Your Comment
      </Button>
      <FormModal
        handleSubmit={handleSubmit}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />
    </div>
  );
};

const UpdateCommentForm: React.FC<{ comment: comment }> = ({ comment }) => {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const toggleModalUpdate: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
  };

  const dispatch = useDispatch();
  const handleUpdateComment = (values: values): void => {
    const { rating, author, comment, id } = values;
    dispatch(updateComment({ rating, author, comment, id }));
  };

  return (
    <div style={{ display: "inline-block" }} className="ml-3">
      <UpdateFormModal
        comment={comment}
        handleSubmit={handleUpdateComment}
        isModalUpdateOpen={isModalUpdateOpen}
        toggleModalUpdate={toggleModalUpdate}
      />
      <Button outline onClick={toggleModalUpdate} className="mt-3 mb-3 comment">
        Update Comment
      </Button>
    </div>
  );
};

interface updateFormModal {
  isModalUpdateOpen: boolean;
  toggleModalUpdate: React.MouseEventHandler<HTMLButtonElement>;
  handleSubmit: (formModelData: values) => void;
  comment: comment;
}

interface formModal {
  isModalOpen: boolean;
  toggleModal: React.MouseEventHandler<HTMLButtonElement>;
  handleSubmit: (formModelData: values) => void;
}

const UpdateFormModal: React.FC<updateFormModal> = ({
  isModalUpdateOpen,
  toggleModalUpdate,
  handleSubmit,
  comment,
}): JSX.Element => {
  return (
    <Modal isOpen={isModalUpdateOpen} toggle={toggleModalUpdate}>
      <ModalHeader toggle={toggleModalUpdate}>Update Comment</ModalHeader>
      <ModalBody>
        <LocalForm onSubmit={handleSubmit}>
          <Row className="form-group" style={{ display: "none" }}>
            <Label htmlFor="id" md={12}>
              Id
            </Label>
            <Col>
              <Control.text
                model=".id"
                name="id"
                defaultValue={comment.id}
                disabled
                className="form-control"
              ></Control.text>
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="rating" md={12}>
              Rating
            </Label>
            <Col>
              <Control.select
                model=".rating"
                name="rating"
                className="form-control"
                defaultValue={comment.rating}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="author" md={12}>
              Your Name
            </Label>
            <Col>
              <Control.text
                model=".author"
                id="author"
                name="author"
                defaultValue={comment.author}
                className="form-control"
                validators={{
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                messages={{
                  required: "Required. ",
                  minLength: "Must be greater than 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="comment" md={12}>
              Your Comment
            </Label>
            <Col>
              <Control.textarea
                model=".comment"
                defaultValue={comment.comment}
                id="comment"
                name="comment"
                rows={6}
                className="form-control"
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Button type="submit" color="primary">
                Update Comment
              </Button>
            </Col>
          </Row>
        </LocalForm>
      </ModalBody>
    </Modal>
  );
};

const FormModal: React.FC<formModal> = ({
  isModalOpen,
  toggleModal,
  handleSubmit,
}) => {
  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
      <ModalBody>
        <LocalForm onSubmit={handleSubmit}>
          <Row className="form-group">
            <Label htmlFor="rating" md={12}>
              Rating
            </Label>
            <Col>
              <Control.select
                model=".rating"
                name="rating"
                className="form-control"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="author" md={12}>
              Your Name
            </Label>
            <Col>
              <Control.text
                model=".author"
                id="author"
                name="author"
                placeholder="Your Name"
                className="form-control"
                validators={{
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15),
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                messages={{
                  required: "Required. ",
                  minLength: "Must be greater than 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Label htmlFor="comment" md={12}>
              Your Comment
            </Label>
            <Col>
              <Control.textarea
                model=".comment"
                id="comment"
                name="comment"
                rows={6}
                className="form-control"
              />
            </Col>
          </Row>
          <Row className="form-group">
            <Col>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </LocalForm>
      </ModalBody>
    </Modal>
  );
};

export const imageLink: Function = (image: string) => {
  return image.replace(
    "https://my-json-server.typicode.com/hnkhanh/single-page-app-db/",
    ""
  );
};

interface dish {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
}

const RenderDish: Function = (dish: dish): JSX.Element => {
  return (
    <Card>
      <CardImg top src={imageLink(dish.image)} alt={dish.name} />
      <CardBody>
        <CardTitle className="font-weight-bold">$ {dish.price}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
};

interface RenderCommentsProps {
  comments: comment[];
  errMess: string;
}
const RenderComments: React.FC<RenderCommentsProps> = ({
  comments,
  errMess,
}): JSX.Element => {
  const dispatch = useDispatch();
  if (errMess) return <h4>{errMess}</h4>;
  else {
    let options: object = { year: "numeric", month: "short", day: "2-digit" };

    const commentList: Function = (): JSX.Element[] => {
      return comments.map((comment: comment) => (
        <div key={comment.id} className="list-unstyled">
          <p className="mb-2">{comment.comment}</p>
          <p>
            -- {comment.author}
            {", "}
            {new Date(comment.date).toLocaleDateString("en-US", options)}
          </p>
          <Button
            outline
            onClick={() => dispatch(deleteComment(comment.id))}
            className="mt-3 mb-3 comment"
          >
            Delete Comment
          </Button>
          <UpdateCommentForm comment={comment} />
        </div>
      ));
    };
    return commentList();
  }
};

interface DishDetailProps {
  dish: dish;
  comments: comment[];
  isLoading: boolean;
  commentsErrMess: string;
  errMess: string;
}

const DishDetail: React.FC<DishDetailProps> = ({
  dish,
  comments,
  isLoading,
  commentsErrMess,
  errMess,
}) => {
  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  } else if (dish != null) {
    console.log("inside rerender");
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-11 col-md-5 m-3 ">{RenderDish(dish)}</div>
          <div className="col-11 col-md-5 mt-3 ml-3">
            <h4>Comments</h4>
            {<RenderComments comments={comments} errMess={commentsErrMess} />}
            {<CommentForm dishId={dish.id} />}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default DishDetail;
