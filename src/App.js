import React, {Suspense} from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';//redirect in router5 reaplced by navigate in 6
import AllQuotes from './pages/AllQuotes';//most user'll land on this page so loding it slowly is't good Idea
import Layout from './components/layout/Layout';
import Comments from './components/comments/Comments';
import LoadingSpinner from './components/UI/LoadingSpinner';
//lazy loading://whenOnly NewQuote needed react'll execute this,same with other components
const NewQuote = React.lazy(() => import('./pages/NewQuote'));//import NewQuote from './pages/NewQuote';
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'));//import QuoteDetail from './pages/QuoteDetail';
const NotFound = React.lazy(() => import('./pages/NotFound'));//import NotFound from './pages/NotFound';
//in React Router6 switch doesnt exist anymore so we need to replce switch with Routes
//to install router6 go to terminal n type npm install react-router-dom@6 or latest
function App() {
  return (
    <Layout>
      <Suspense fallback={<div className='centered'><LoadingSpinner/></div>}>
      <Routes>
        <Route path='/' element={<Navigate replace to='/quotes' />} />
        <Route path='/quotes' element={<AllQuotes />} />
        <Route path='/quotes/:quoteId' element={<QuoteDetail />}>
          <Route
            path=''
            element={
              <div className='centered'>
                <Link className='btn--flat' to={`comments`}>
                  Load Comments
                </Link>
              </div>
            }
          />
          <Route path={`comments`} element={<Comments />} />
        </Route>
        <Route path='/new-quote' element={<NewQuote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
    </Layout>
  );
}

export default App;
