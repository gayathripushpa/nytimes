import React, { useState, useEffect } from 'react';
import { Grid, Typography, Card, CardContent, CardActions, CardMedia, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardContainer = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const CardImage = styled(CardMedia)({
    height: '100%', // Adjust the height of the image container
    width: '100%', // Ensure the image takes up full width
    objectFit: 'cover', // Maintain aspect ratio and cover the area
});

const ArticleList = ({ period }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=BQ7xKBqSbb6pGFu3WyobvFWxBdPKQDOE`);
                const data = await response.json();
                setArticles(data.results || []); // Ensure 'results' is an array or default to an empty array
            } catch (err) {
                setError(err.message);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [period]); // Re-fetch articles whenever the period changes

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    return (
        <Box p={2}>
            <Grid container spacing={2}>
                {articles.map(article => {
                    const imageUrl = article.media.length > 0 && article.media[0]['media-metadata'] ? 
                        article.media[0]['media-metadata'].find(m => m.format === 'mediumThreeByTwo440')?.url : null;

                    return (
                        <CardContainer item key={article.id} xs={12}>
                            <Card>
                                <Grid container>
                                    {imageUrl && (
                                        <Grid item xs={2}>
                                            <CardImage
                                                component="img"
                                                image={imageUrl}
                                                alt={article.title}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={imageUrl ? 8 : 12}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {article.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {article.abstract}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>By:</strong> {article.byline}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                        </CardActions>
                                    </Grid>
                                </Grid>
                            </Card>
                        </CardContainer>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default ArticleList;
