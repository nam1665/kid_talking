import { addLocaleData } from 'react-intl';
import 'moment/locale/vi';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';

addLocaleData([...en, ...vi]);
