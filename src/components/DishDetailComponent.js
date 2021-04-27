import React, {useState} from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { required, maxLength, minLength } from "./ContactComponent";
import { FadeTransform } from 'react-animation-components';
import { useDispatch } from 'react-redux';
import { addComment, deleteComment, updateComment } from '../redux/reducers/comments'

const CommentForm = ({ dishId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSubmit = (values) => {
    const {rating, author, comment} = values
    dispatch(addComment({ dishId, rating, author, comment, 
      date: new Date().toISOString()
     }))
  }

  return(
    <div className="col-12">
      <Button outline onClick={toggleModal} className="mt-3 mb-3 comment">
        Post Your Comment
      </Button>
      <FormModal 
        handleSubmit = {handleSubmit}
        isModalOpen = {isModalOpen}
        toggleModal = {toggleModal}
        modalTitle = "Submit Comment"
        buttonTitle = "Submit Comment"
      />
    </div>
  )
}

const UpdateCommentForm = ({comment}) => {

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const toggleModalUpdate = () => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
  };

  const dispatch = useDispatch();
  const handleUpdateComment = (values) => {
    const {rating, author, comment, id} = values
    dispatch(updateComment({ rating, author, comment , id}))
  }

  return(
    <div style={{display: 'inline-block' }}
    className="ml-3">
     
      <UpdateFormModal 
      comment = {comment}
        handleSubmit = {handleUpdateComment}
        isModalUpdateOpen = {isModalUpdateOpen}
        toggleModalUpdate = {toggleModalUpdate}
      />
      <Button outline 
        onClick={toggleModalUpdate}
        className="mt-3 mb-3 comment"
        >
        Update Comment
      </Button>
          </div>
  )
}

const UpdateFormModal = ({isModalUpdateOpen, toggleModalUpdate, handleSubmit, comment}) => {

  return (
    <Modal isOpen={isModalUpdateOpen} toggle={toggleModalUpdate}>
        <ModalHeader toggle={toggleModalUpdate}>Update Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={ handleSubmit }>
          <Row className="form-group" style={{display: 'none'}}>
            <Label htmlFor="id" md={12} >Id
            </Label>
            <Col>
                <Control.text model=".id" name="id"
                defaultValue = {comment.id}
                disabled className="form-control">
                </Control.text>
              </Col> 
          </Row>
         <Row className="form-group">
            <Label htmlFor="rating" md={12}>Rating
            </Label>
            <Col>
                  <Control.select model=".rating" name="rating"
                      className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </Control.select>
              </Col> 
          </Row>
          <Row className="form-group">
              <Label htmlFor="author" md={12}>Your Name</Label>
              <Col>
                  <Control.text model=".author" id="author" name="author"
                      defaultValue= {comment.author}
                      className="form-control"
                      validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                  }}  />
                  <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                      required: 'Required. ',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
                  />
              </Col>
          </Row>
          <Row className="form-group">
              <Label htmlFor="comment" md={12}>Your Comment</Label>
              <Col>
                  <Control.textarea model=".comment" 
                  defaultValue = {comment.comment}
                  id="comment" 
                  name="comment"
                  rows="6"
                  className="form-control" />
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
  )
}

const FormModal = ({isModalOpen, toggleModal, handleSubmit}) => {

  return (
    <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
          <Row className="form-group">
            <Label htmlFor="rating" md={12}>Rating
            </Label>
            <Col>
                  <Control.select model=".rating" name="rating"
                      className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                  </Control.select>
              </Col>
          </Row>
          <Row className="form-group">
              <Label htmlFor="author" md={12}>Your Name</Label>
              <Col>
                  <Control.text model=".author" id="author" name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                  }}  />
                  <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                      required: 'Required. ',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                  }}
                  />
              </Col>
          </Row>
          <Row className="form-group">
              <Label htmlFor="comment" md={12}>Your Comment</Label>
              <Col>
                  <Control.textarea model=".comment" 
                  id="comment" 
                  name="comment"
                  rows="6"
                  className="form-control" />
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
  )
}

export const imageLink = (image) => {
  return image.replace('https://my-json-server.typicode.com/hnkhanh/single-page-app-db/','');
}
const RenderDish = (dish) => {
  return (
    <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)'}}>
      <Card>
        <CardImg top src={imageLink(dish.image)} alt={dish.name} />
        <CardBody>
          <CardTitle className="font-weight-bold">$ {dish.price}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};

const RenderComments = ({comments, errMess}) => {
  
  const dispatch = useDispatch();
  if (errMess) return <h4>{errMess}</h4>;
  else {
    let options = { year: "numeric", month: "short", day: "2-digit" };
    // console.log("why render me")
    return (
      <div> 

        {comments.map(comment => {

          return (
            <div key={comment.id} className="list-unstyled">
            <p className="mb-2" >{comment.comment}</p>
            <p>
              -- {comment.author}
              {", "}
              {new Date(comment.date).toLocaleDateString("en-US", options)}
            </p>
            <Button outline 
            onClick={() => dispatch(deleteComment(comment.id))} 
            className="mt-3 mb-3 comment"
            >
            Delete Comment
            </Button>
            <UpdateCommentForm 
              comment = {comment}
              className= "update-comment"
              // className="mt-3 mb-3 comment"
            />
            
          </div>
      )
        })}
      
      </div>
    );
        }
        
 
};

const Pagination = ({commentsPerPage, totalComments, onPageChange}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
    <ul className='pagination'>
      {pageNumbers.map(number => (
        <li key={number} 
        className='page-item' 
       >
           <a onClick={onPageChange} id={number} className='page-link'>
            {number}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  )
}

const DishDetail = ({ dish, comments, isLoading, commentsErrMess, errMess }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  
  
  const onPageChange = (e) => {
    setCurrentPage(Number(e.target.id))
    }
console.log("rerender")
  if (isLoading) {
    return(
      <div className="container">
          <div className="row">            
              <Loading />
          </div>
      </div>
    );
  }
  else if (errMess) {
    return(
      <div className="container">
          <div className="row">            
              <h4>{errMess}</h4>
          </div>
      </div>
    );
  }
  else if (dish != null) {
    console.log("inside rerender")
    return(
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
        <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>                
        </div>
        <div className="row">
          <div className="col-11 col-md-5 m-3 ">
          {RenderDish(dish)}
          </div>
          <div className="col-11 col-md-5 mt-3 ml-3">
            <h4>Comments</h4>
            {<RenderComments
                comments={currentComments}
                errMess = {commentsErrMess}
              />}
                {commentsPerPage < comments.length && 
                <Pagination 
                commentsPerPage={commentsPerPage} 
                totalComments={comments.length}
                onPageChange={onPageChange}
              />}
              {<CommentForm 
                dishId={dish.id} 
                />
              }
          </div>
        </div>
      </div>
    )
  }
};

export default DishDetail;
