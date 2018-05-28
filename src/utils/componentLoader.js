import Loadable from 'react-loadable';
import Loading from '../components/atoms/Loading';

const componentLoader = options =>
  Loadable({
    loading: Loading,
    ...options,
  });

export default componentLoader;
