import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getComments } from '../redux/reducers/comments';
import { getDishes } from '../redux/reducers/dishes';
import { getLeaders } from '../redux/reducers/leaders';
import { getPromotions } from '../redux/reducers/promotions';
import About from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

// const mapDispatchToProps = dispatch => ({
//   postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
//   postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
//   fetchDishes: () =>  dispatch(fetchDishes()),
//   resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
//   fetchComments: () => dispatch(fetchComments()),
//   fetchPromos: () => dispatch(fetchPromos()),
//   fetchLeaders: () => dispatch(fetchLeaders()),
// });


const Main = (props) => {
  const {dishes, comments, promotions, leaders, postFeedback, resetFeedbackForm } = props;
  const [selectedDish, setSelectedDish] = React.useState(null);
  const dispatch = useDispatch();
  
  const onDishSelect = (dishId) => {
    setSelectedDish(dishId);
  };

  useEffect(() => {
    dispatch(getDishes())
    dispatch(getLeaders())
    dispatch(getComments())
    dispatch(getPromotions())
  },[dispatch]);
  
  const HomePage = () => {
    return(
      <Home 
        dish = {dishes.dishes.filter(dish => dish.featured)[0]}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        promotion = {promotions.promotions.filter(promo => promo.featured)[0]}
        promoLoading = {promotions.isLoading}
        promoErrMess = {promotions.errMess}
        leader ={leaders.leaders.filter(leader => leader.featured)[0]}
        leaderLoading = {leaders.isLoading}
        leaderErrMess = {leaders.errMess}
      />
    );
  }

  const DishWithId = ({match}) => {
    return(
      <DishDetail 
        dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess = {comments.errMess}
        // postComment={postComment}
      />
    );
  };

  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={props.location.pathname} classNames="page" timeout={300}>
          <Switch location={props.location}>
            <Route path='/home' component={HomePage} />
            <Route path='/about-us' component={() => 
              <About 
                leaders={leaders.leaders} 
                leaderLoading ={leaders.isLoading}
                leaderErrMess = {leaders.errMess}
              />} />
            <Route exact path='/menu' component={() => <Menu dishes={dishes} />} />
            <Route exact path='/contact-us' component={() => 
              <Contact 
              postFeedback={postFeedback}
              resetFeedbackForm={resetFeedbackForm}
              />}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
        </TransitionGroup>
      <Footer />
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(Main));
