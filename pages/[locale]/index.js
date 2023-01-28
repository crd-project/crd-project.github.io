import { getStaticPaths, getI18nProps } from '@Libs/getStatic';

import HomeContainer from "@Containers/home";

export { getStaticPaths }
export const getStaticProps = async ctx => {
    return {
        props: {
            ...(await getI18nProps(ctx, ['common', 'home'])),
        },
    }
}

export default HomeContainer;
