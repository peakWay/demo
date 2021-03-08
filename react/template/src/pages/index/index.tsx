
import Card from "@/components/card/card";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from './index.m.scss';

interface IProps {
    name: string;
}

const IndexPage: React.FC<RouteComponentProps> = () => {
    return (
        <>
            <div>这是首页</div>
            <Card>
                <div style={{width: '200px', height: '100px'}}>折线图</div>
            </Card>
        </>
    )
};

export default IndexPage;